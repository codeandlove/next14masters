import type { ProductItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type SortByKey } from "@/ui/types";
import { sortByKey } from "@/ui/utils";

export const ProductList = ({
	products,
	sortby,
}: {
	products: ProductItemFragment[];
	sortby?: SortByKey;
}) => {
	let resultProducts = products;
	if (sortby) {
		resultProducts = sortByKey(products, sortby);
	}

	return (
		<ul
			data-testid="products-list"
			className="grid w-full grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
		>
			{resultProducts &&
				resultProducts.map((product) => {
					return <ProductListItem key={product.id} product={product} />;
				})}
		</ul>
	);
};
