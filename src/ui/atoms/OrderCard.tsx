import Image from "next/image";
import { type OrderItemFragment } from "@/gql/graphql";

export const OrderCard = ({ order }: { order: OrderItemFragment }) => {
	const { id, createdAt, email, totalAmount, orderItems } = order;
	const date = new Date(createdAt as string).toLocaleDateString();
	const time = new Date(createdAt as string).toLocaleTimeString();

	return (
		<div className="bg-white p-4 shadow-2xl shadow-black/10">
			<div className="flex flex-wrap items-center justify-between">
				<h2 className="text-xl font-bold">Order id: {id}</h2>
				<p className="w-full text-sm text-gray-500">email: {email}</p>
				<p className="w-full text-sm text-gray-500">
					{date} {time}
				</p>
			</div>
			<div className="mt-4 flex flex-wrap items-center justify-between">
				<p className="text-sm text-gray-500">Total: {totalAmount}</p>
			</div>
			<div className="mt-4">
				{orderItems &&
					orderItems.map((orderItem, index) => {
						const {
							id,
							quantity,
							product: { name, image },
						} = orderItem;
						return (
							<div
								key={`order-item-${index}`}
								className="flex flex-wrap items-center justify-end space-x-4"
							>
								<p>{id}</p>
								<p className="mr-auto text-sm">{name}</p>
								<p className="text-sm">quantity: {quantity}</p>
								{image && name && (
									<Image
										src={image as string}
										width={32}
										height={32}
										alt={name as string}
										className="h-8 w-8"
									/>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
};
