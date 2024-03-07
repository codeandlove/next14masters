import { CloseModal } from "@/ui/atoms/CloseModal";
import { ModalOverlay } from "@/ui/atoms/ModalOverlay";
import { GotoCart } from "@/ui/atoms/GotoCart";
import { getCartFromCookies } from "@/api/cart";
import { OrderItemQuantity } from "@/ui/atoms/OrderItemQuantity";
import { OrderRemoveItem } from "@/ui/atoms/OrderRemoveItem";
import { formatPrice } from "@/ui/utils";
import { ProductThumbImage } from "@/ui/atoms/ProductThumbImage";

export default async function ModalCart() {
	const cart = await getCartFromCookies();

	return (
		<>
			<div className="container fixed inset-y-0 right-0 z-30 flex w-full max-w-sm flex-col bg-white p-8 shadow-xl">
				<CloseModal />
				<h2 className="border-b pb-2 text-left text-xl font-bold">
					Cart ({cart?.orderItems.length || 0})
				</h2>
				{cart && cart.orderItems ? (
					<>
						<div className="my-2 divide-y">
							{cart.orderItems.slice(0, 4).map((item, index) => {
								const { product } = item;
								return (
									<div key={`product-item-${index}`} className="flex flex-col py-2">
										<div className="flex items-start justify-between space-x-2">
											<ProductThumbImage src={product.image} alt={product.name} />
											<div className="flex-1">
												<span className="font-semibold">{product.name}</span>
											</div>
											<OrderRemoveItem cartId={cart.id} productId={product.id} />
										</div>
										<div className="flex items-center space-x-2">
											<OrderItemQuantity
												cartId={cart.id}
												productId={product.id}
												quantity={item.quantity}
											/>
											<p className="flex-1 text-right font-semibold">
												{formatPrice(product.price)}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</>
				) : (
					<>
						<p>No items in cart</p>
					</>
				)}
				<div className="mt-auto p-2">
					<GotoCart />
				</div>
			</div>
			<ModalOverlay />
		</>
	);
}
