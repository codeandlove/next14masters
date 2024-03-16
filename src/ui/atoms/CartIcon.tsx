import Link from "next/link";
import { ShoppingBag } from "lucide-react";
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
			<Link className="flex items-center" href={{ pathname: "/minicart" }}>
				<ShoppingBag className="mr-1" /> ({quantity})
			</Link>
		</div>
	);
}
