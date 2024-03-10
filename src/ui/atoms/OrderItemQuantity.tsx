"use client";

import { useOptimistic } from "react";
import { updateOrderItemAction } from "@/ui/actions";

export const OrderItemQuantity = ({
	cartId,
	productId,
	quantity,
}: {
	cartId: string;
	productId: string;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex items-center">
			<button
				data-testid="decrement"
				type="submit"
				className="btn btn-small btn-secondary flex items-center justify-center"
				formAction={async () => {
					const qty: number = optimisticQuantity > 1 ? optimisticQuantity - 1 : 1;
					setOptimisticQuantity(qty);
					await updateOrderItemAction(cartId, productId, qty);
				}}
			>
				-
			</button>
			<div className="p-4" data-testid="quantity">
				{optimisticQuantity}
			</div>
			<button
				data-testid="increment"
				type="submit"
				className="btn btn-small btn-secondary flex items-center justify-center"
				formAction={async () => {
					const qty: number = optimisticQuantity + 1;
					setOptimisticQuantity(qty);
					await updateOrderItemAction(cartId, productId, qty);
				}}
			>
				+
			</button>
		</form>
	);
};
