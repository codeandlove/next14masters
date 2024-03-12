import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getOrdersByUserId } from "@/api/graphql";
import { OrderCard } from "@/ui/atoms/OrderCard";

export default async function OrdersPage() {
	const user = await currentUser();
	const email = user?.emailAddresses[0]?.emailAddress;
	const userId = user?.id;

	if (!email || !userId) {
		return redirect("/sign-in");
	}

	const orders = await getOrdersByUserId({ userId: userId });

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
			{orders.map((order, index) => (
				<OrderCard key={`order-${index}`} order={order} />
			))}
		</div>
	);
}
