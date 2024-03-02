import { type ProductItemFragment } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";

export const RelatedProducts = async ({
	products,
	limit,
}: {
	products: ProductItemFragment[] | undefined;
	limit: number;
}) => {
	return (
		<section>
			<div className="w-full" data-testid="related-products">
				<h2 className="mb-4 text-center text-xl font-bold leading-snug">Related Products</h2>
				{products && <ProductList products={products.slice(limit * -1)} />}
			</div>
		</section>
	);
};
