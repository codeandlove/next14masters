import { cookies } from "next/headers";
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
