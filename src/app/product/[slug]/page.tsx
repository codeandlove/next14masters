import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsList, getProductBySlug } from "@/api/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { formatPrice } from "@/ui/utils";
import { type ProductItemFragment } from "@/gql/graphql";
import { ProductQtyInput } from "@/ui/atoms/ProductQtyInput";

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const product = (await getProductBySlug({ slug: params.slug })) as ProductItemFragment;

	return {
		title: `${product.name}`,
		description: `${product.description}`,
		openGraph: {
			title: `${product.name}`,
			description: `${product.description}`,
			type: "website",
			images: [
				{
					url: product.image,
					alt: product.name,
				},
			],
		},
	};
};

export const generateStaticParams = async () => {
	const products = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];
	return products.map((product) => ({
		params: {
			slug: product.slug,
		},
	}));
};

export default async function ProductPage({
	params,
}: {
	params: {
		slug: string;
	};
}) {
	const product = (await getProductBySlug({ slug: params.slug })) as ProductItemFragment;
	const relatedProducts = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];

	return (
		<section className="w-full space-y-10">
			<div className="mx-auto max-w-6xl gap-x-8 md:grid md:grid-cols-2">
				<div className="mb-8 md:m-0">
					<ProductCoverImage src={product.image} alt="" />
				</div>
				<div className="col-span-1 flex flex-col space-y-3">
					<h1 className="max-w-96 text-2xl font-bold leading-snug md:mt-16">{product.name}</h1>
					{product.categories[0] && (
						<div className="font-semibold">{product.categories[0]?.name}</div>
					)}
					<div className="text-xl font-bold">{formatPrice(product.price)}</div>
					<div className="text-gray-500">{product.description}</div>
					<div className="md:!mt-auto">
						<ProductQtyInput />
					</div>
					<button type="button" className="btn btn-primary md:!mb-8">
						Add to cart
					</button>
				</div>
				<div className="col-span-2 my-8">{product.longDescription}</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<RelatedProducts products={relatedProducts} limit={4} />
			</Suspense>
		</section>
	);
}
