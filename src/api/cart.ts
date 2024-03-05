import { cookies } from "next/headers";
import { getCartDataById, createNewCart } from "@/api/graphql";
import { type CartOrderFragment, type CartOrderItemFragment } from "@/gql/graphql";

export async function getOrCreateCart(): Promise<
	CartOrderFragment & { orderItems?: CartOrderItemFragment[] }
> {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cartById = await getCartDataById({ id: cartId });
		if (cartById) {
			return cartById;
		}
	}

	const newCart = await createNewCart();

	if (!newCart) {
		throw new Error("Failed to create cart");
	}

	cookies().set("cartId", newCart.id);

	return newCart;
}
