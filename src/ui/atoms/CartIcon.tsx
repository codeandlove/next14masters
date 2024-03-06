import Link from "next/link";
import { getCartFromCookies } from "@/api/cart";

export async function CartIcon() {
	const cart = await getCartFromCookies();

	let quantity: number = 0;

	if (cart && cart.orderItems) {
		for (const item of cart.orderItems) {
			quantity += item.quantity ?? 0;
		}
	}

	return <Link href="/cart">Cart ({quantity})</Link>;
}
