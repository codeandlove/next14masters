import { type ProductItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/ui/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemFragment;
};

export const ProductListItemDescription = ({
	product: { categoryId, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 w-full justify-between space-y-3">
			<div className="grid grid-cols-3">
				<span className="text-sm text-slate-500">{categoryId}</span>
				<h2 className="col-span-2 text-right text-sm font-semibold leading-snug">{name}</h2>
			</div>
			<span className="block w-full text-right font-bold">{formatPrice(price)}</span>
		</div>
	);
};
