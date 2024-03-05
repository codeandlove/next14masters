"use client";

import Link from "next/link";
import { type CartOrderItemFragment, type CartOrderFragment } from "@/gql/graphql";

export async function CartIcon({
	cart,
}: {
	cart: CartOrderFragment & { orderItems?: CartOrderItemFragment[] };
}) {
	let quantity: number = 0;

	if (cart && cart.orderItems) {
		for (const item of cart.orderItems) {
			quantity += item.quantity ?? 0;
		}
	}

	return <Link href="/cart">Cart ({quantity})</Link>;
}
