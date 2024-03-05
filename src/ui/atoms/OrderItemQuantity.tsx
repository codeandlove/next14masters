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
				type="submit"
				className="btn btn-secondary flex h-10 w-10 items-center justify-center p-1"
				formAction={async () => {
					const qty: number = optimisticQuantity > 1 ? optimisticQuantity - 1 : 1;
					setOptimisticQuantity(qty);
					await updateOrderItemAction(cartId, productId, qty);
				}}
			>
				-
			</button>
			<div className="p-4">{optimisticQuantity}</div>
			<button
				type="submit"
				className="btn btn-secondary flex h-10 w-10 items-center justify-center p-1"
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
