import type { ProductItemFragment } from "@/gql/graphql";
import { formatPrice } from "@/ui/utils";

export const ProductListItemDescription = ({
	product: { categories, collections, name, price },
}: {
	product: ProductItemFragment;
}) => {
	return (
		<div className="mt-2 w-full justify-between space-y-3">
			<div className="grid grid-cols-3">
				{categories && <span className="text-sm text-slate-500">{categories[0]?.name}</span>}
				<h2 className="col-span-2 text-right text-sm font-semibold leading-snug">{name}</h2>
			</div>
			{collections && <span className="text-sm text-slate-500">{collections[0]?.name}</span>}
			<span className="block w-full text-right text-sm font-bold text-slate-600">
				{formatPrice(price)}
			</span>
		</div>
	);
};
