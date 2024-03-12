"use server";

import { cookies } from "next/headers";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { getCartDataById, createNewCart, placeOrder } from "@/api/graphql";
import { type CartOrderFragment, type CartOrderItemFragment } from "@/gql/graphql";

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await getCartDataById({ id: cartId });
		if (cart) {
			return cart;
		} else {
			cookies().delete("cartId");
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

	cookies().set("cartId", newCart.id, {
		maxAge: 60 * 60 * 24 * 365,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		priority: "low",
	});

	return newCart;
}

export const handlePaymentAction = async (formData: FormData) => {
	"use server";

	const email = formData.get("email") as string;
	const userId = formData.get("userId") as string;

	if (!email) {
		return;
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	const cart = await getCartFromCookies();

	if (cart && cart.orderItems) {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2023-10-16",
			typescript: true,
		});

		const websiteUrl = process.env.WEBSITE_URL || "http://localhost:3000";

		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			metadata: {
				cartId: cart.id,
				email: email,
				userId: userId || null,
			},
			line_items: cart.orderItems.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.product.name,
					},
					unit_amount: item.product.price,
				},
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${websiteUrl}/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${websiteUrl}/cart/cancel?sessionId={CHECKOUT_SESSION_ID}`,
		});

		const totalAmount = cart.orderItems.reduce(
			(acc, item) => acc + item.product.price * item.quantity,
			0,
		);

		await placeOrder({
			orderId: cart.id,
			email: email,
			userId: userId,
			sessionId: checkoutSession.id,
			totalAmount: totalAmount,
		});

		if (!checkoutSession.url) {
			throw new Error("Failed to create checkout session");
		}

		cookies().set("cartId", "");
		redirect(checkoutSession.url);
	}
};
