"use server";

import { revalidateTag } from "next/cache";
import { addOrderItem, removeOrderItem, updateOrderItem } from "@/api/graphql";

export const updateOrderItemAction = async (
	cartId: string,
	productId: string,
	quantity: number,
) => {
	await updateOrderItem({
		orderId: cartId,
		productId: productId,
		quantity: quantity,
	});

	revalidateTag("cart");
};

export const removeOrderItemAction = async (cartId: string, productId: string) => {
	await removeOrderItem({
		orderId: cartId,
		productId: productId,
	});

	revalidateTag("cart");
};

export async function addToCart(cartId: string, productId: string, quantity: number) {
	return addOrderItem({ orderId: cartId, productId: productId, quantity: quantity });
}
