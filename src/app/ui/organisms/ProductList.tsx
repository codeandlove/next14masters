import { ProductListItem } from "@/app/ui/molecules/ProductListItem";
import type { ProductItemType } from "@/app/ui/types";

export const ProductList = ({ products }: { products: ProductItemType[] }) => {
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
