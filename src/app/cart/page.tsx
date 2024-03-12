import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { formatPrice } from "@/ui/utils";
import { OrderItemQuantity } from "@/ui/atoms/OrderItemQuantity";
import { OrderRemoveItem } from "@/ui/atoms/OrderRemoveItem";
import { getCartFromCookies, handlePaymentAction } from "@/api/cart";
import { ProductThumbImage } from "@/ui/atoms/ProductThumbImage";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	let email, userId;

	const auth = await currentUser().then((user) => user);

	if (auth) {
		const findEmail = auth.emailAddresses.find((email) => {
			return email.id.toString() === auth.primaryEmailAddressId?.toString();
		});

		email = findEmail?.emailAddress;
		userId = auth?.id;
	}

	if (!cart) {
		redirect("/");
	}

	const { orderItems } = cart;

	const haveItems = (): boolean => {
		if (orderItems && orderItems.length > 0) {
			return true;
		}

		return false;
	};

	return (
		<div>
			<div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full table-fixed text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
					<thead className="text-xs uppercase text-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
								Product
							</th>
							<th scope="col" className="px-6 py-3">
								Quantity
							</th>
							<th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
								Unit price
							</th>
							<th scope="col" className="px-6 py-3">
								Total
							</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						<>
							{!haveItems() ? (
								<tr>
									<td colSpan={4} className="py-4 text-center">
										No items in cart
									</td>
								</tr>
							) : (
								<>
									{haveItems() &&
										orderItems &&
										orderItems.map((item, index) => {
											const { product } = item;
											return (
												<tr
													key={`product-item-${index}`}
													className="border-b border-gray-200 dark:border-gray-700"
												>
													<th
														scope="row"
														className="bg-gray-50 px-6 py-4 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
													>
														<div className="flex space-x-2">
															<ProductThumbImage src={product.image} alt={product.name} />
															<span className="break-words py-2">{product.name}</span>
														</div>
													</th>
													<td className="px-6 py-4">
														<OrderItemQuantity
															cartId={cart.id}
															productId={product.id}
															quantity={item.quantity}
														/>
													</td>

													<td className="bg-gray-50 px-6 py-4 font-medium dark:bg-gray-800">
														{formatPrice(product.price)}
													</td>

													<td className="px-6 py-4 font-bold">
														{formatPrice(product.price * item.quantity)}
													</td>
													<td className="w-20">
														<OrderRemoveItem cartId={cart.id} productId={product.id} />
													</td>
												</tr>
											);
										})}
								</>
							)}
						</>
					</tbody>
				</table>
			</div>
			{haveItems() && cart && (
				<div className="w-full p-4">
					<form className="flex w-full items-end justify-end" action={handlePaymentAction}>
						<div className="form-control mr-4 flex-row items-center">
							{email ? (
								<>
									<input type="hidden" name="email" value={email} />
									<input type="hidden" name="userId" value={userId} />
									<p>
										You are logged in as: <strong>{email}</strong>
									</p>
								</>
							) : (
								<>
									<label htmlFor="email" className="form-label mb-0 mr-4">
										Email
									</label>
									<input
										type="email"
										placeholder="Please enter an email..."
										id="email"
										name="email"
										required
										className="form-input"
									/>
								</>
							)}
						</div>
						<button type="submit" className="btn btn-primary w-64">
							Pay now
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
