"use client";

import { getAiProductsRelated } from "@/api/ai";
import { getProductsListOfIds } from "@/api/graphql";
import { type ProductItemFragment } from "@/gql/graphql";
import { ProductList } from "@/ui/organisms/ProductList";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";

export const AiRelatedProducts = async ({ description }: { description: string }) => {
	const aiRelatedProductsQuery = await getAiProductsRelated(description);
	const aiRelatedProducts = (await getProductsListOfIds({
		ids: aiRelatedProductsQuery.data,
	})) as ProductItemFragment[];

	return (
		<section>
			<div className="w-full" data-testid="related-products">
				<h2 className="mb-4 text-center text-xl font-bold leading-snug">
					Ai Product Recomendations
				</h2>
				{aiRelatedProducts && <ProductList products={aiRelatedProducts} showDescription={true} />}
			</div>
		</section>
	);

	return <RelatedProducts products={aiRelatedProducts} limit={8} />;
};
