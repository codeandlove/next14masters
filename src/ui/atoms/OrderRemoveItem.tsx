"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { removeOrderItem } from "@/api/graphql";

export const OrderRemoveItem = ({ cartId, productId }: { cartId: string; productId: string }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<button
			className="btn btn-small btn-secondary !p-2"
			disabled={isPending}
			onClick={() => {
				startTransition(async () => {
					await removeOrderItem({ orderId: cartId, productId: productId });
					router.refresh();
				});
			}}
		>
			<Trash size={16} />
		</button>
	);
};
