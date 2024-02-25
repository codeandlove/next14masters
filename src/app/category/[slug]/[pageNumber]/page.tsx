import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";

import { getCategoryBySlugGQL } from "@/api/graphql";
import { type ProductItemType } from "@/ui/types";

export default async function CategoryPage({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const categoryBySlug = await getCategoryBySlugGQL({ slug: params.slug });
	const category = categoryBySlug[0];

	if (!category) {
		throw notFound();
	}

	if (!category.products.length) {
		return (
			<>
				<p>This category does not contain any products.</p>
			</>
		);
	}

	const products = category.products.map((product) => {
		return {
			id: product.id,
			name: product.name,
			slug: product.slug,
			coverImage: {
				src: product.image,
				alt: product.name,
			},
			categoryId: product.categoryId,
			price: product.price,
			description: product.description,
			longDescription: product.longDescription,
		};
	}) as ProductItemType[];

	return (
		<>
			<div>{category.name}</div>
			<ProductList products={products} />
		</>
	);
}
