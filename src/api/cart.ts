import { cookies } from "next/headers";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { getCartDataById, createNewCart } from "@/api/graphql";
import { type CartOrderFragment, type CartOrderItemFragment } from "@/gql/graphql";

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await getCartDataById({ id: cartId });
		if (cart) {
			return cart;
		}
	}
}

export async function getOrCreateCart(): Promise<
	CartOrderFragment & { orderItems?: CartOrderItemFragment[] }
> {
	const cart = await getCartFromCookies();

	if (cart) {
		return cart;
	}

	const newCart = await createNewCart();

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);

	return newCart;
}

export const handlePaymentAction = async () => {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	const cart = await getCartFromCookies();

	if (cart && cart.orderItems) {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2023-10-16",
			typescript: true,
		});

		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			metadata: {
				cartId: cart.id,
			},
			line_items: cart.orderItems.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.product.name,
					},
					unit_amount: item.product.price * 100,
				},
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: "http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
			cancel_url: "http://ocalhost:3000/cart/cancel",
		});

		if (!checkoutSession.url) {
			throw new Error("Failed to create checkout session");
		}

		cookies().set("cartId", "");
		redirect(checkoutSession.url);
	}
};
