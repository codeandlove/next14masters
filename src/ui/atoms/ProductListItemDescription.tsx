import clsx from "clsx";
import type { ProductItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/ui/utils";

export const ProductListItemDescription = ({
	product: { categories, collections, name, price, rating, status },
}: {
	product: ProductItemFragment;
}) => {
	const inStock: boolean = status === "INSTOCK";
	return (
		<div className="mb-4 mt-1 p-2">
			<div className="grid grid-cols-3">
				{categories && <span className="py-1 text-sm text-slate-500">{categories[0]?.name}</span>}
				<h2 className="col-span-2 py-1 text-right text-sm font-semibold leading-snug">{name}</h2>
			</div>
			<div className="flex items-center justify-between py-1">
				{rating && (
					<span className="mr-2 text-slate-500">
						<span data-testid="product-rating">{rating}</span>{" "}
						<span className="text-yellow-500">{"★".repeat(Math.floor(rating))}</span>
					</span>
				)}
				{status && (
					<span className={clsx("ml-2 text-sm text-red-600", inStock && "!text-green-600")}>
						{status}
					</span>
				)}
			</div>
			<div className="mt-2 w-full justify-between space-y-3">
				<div className="grid grid-cols-3">
					{collections && <span className="text-sm text-slate-800">{collections[0]?.name}</span>}
					<span
						className="col-span-2 w-full text-right text-sm font-bold text-slate-600"
					>
						<span className="sr-only" data-testid="product-price">
							{price}
						</span>
						{formatPrice(price)}
					</span>
				</div>
			</div>
		</div>
	);
};
