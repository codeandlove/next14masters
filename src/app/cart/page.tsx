import { redirect } from "next/navigation";
import { formatPrice } from "@/ui/utils";
import { OrderItemQuantity } from "@/ui/atoms/OrderItemQuantity";
import { OrderRemoveItem } from "@/ui/atoms/OrderRemoveItem";
import { getOrCreateCart } from "@/api/cart";

export default async function CartPage() {
	const cart = await getOrCreateCart();

	if (!cart) {
		redirect("/");
	}

	const { orderItems } = cart;

	return (
		<div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
				<thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
							Product
						</th>
						<th scope="col" className="px-6 py-3">
							Unit price
						</th>
						<th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
							Quantity
						</th>
						<th scope="col" className="px-6 py-3">
							Total
						</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					<>
						{!orderItems || !orderItems.length ? (
							<tr>
								<td colSpan={4} className="py-4 text-center">
									No items in cart
								</td>
							</tr>
						) : (
							<>
								{orderItems.map((item) => {
									const { product } = item;
									return (
										<>
											<tr className="border-b border-gray-200 dark:border-gray-700">
												<th
													scope="row"
													className="whitespace-nowrap bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
												>
													{product.name}
												</th>
												<td className="px-6 py-4">{formatPrice(product.price)}</td>

												<td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
													<OrderItemQuantity
														cartId={cart.id}
														productId={product.id}
														quantity={item.quantity}
													/>
												</td>

												<td className="px-6 py-4 font-bold">
													{formatPrice(product.price * item.quantity)}
												</td>
												<td>
													<OrderRemoveItem cartId={cart.id} productId={product.id} />
												</td>
											</tr>
										</>
									);
								})}
							</>
						)}
					</>
				</tbody>
			</table>
		</div>
	);
}
