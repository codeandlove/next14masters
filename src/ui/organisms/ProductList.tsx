import {type ProductItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

export const ProductList = ({ products }: { products: ProductItemFragment[] }) => {
	return (
		<ul
			data-testid="products-list"
			className="grid w-full grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => {
				return <ProductListItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
