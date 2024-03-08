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

	return (
		<div className="mx-4">
			<Link href="/minicart">Cart ({quantity})</Link>
		</div>
	);
}
