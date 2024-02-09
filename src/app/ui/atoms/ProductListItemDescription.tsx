import type { ProductItemType } from "@/app/ui/types";
import { formatPrice } from "@/app/ui/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-2 w-full justify-between">
			<div className="grid grid-cols-2">
				<span className="text-sm text-slate-500">{category}</span>
				<strong className="text-right text-sm">{name}</strong>
			</div>
			<span className="block w-full text-right font-bold">{formatPrice(price)}</span>
		</div>
	);
};
