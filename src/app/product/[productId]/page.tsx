import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductsList, getProductById } from "@/api/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { formatPrice } from "@/ui/utils";
import type { ProductItemFragment } from "@/gql/graphql";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById({ id: params.productId }) as ProductItemFragment;
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
			productId: product.id,
		},
	}));
};

export default async function ProductPage({
	params,
}: {
	params: {
		productId: string;
	};
}) {
	const product = await getProductById({ id: params.productId }) as ProductItemFragment;

	return (
		<section className="w-full space-y-10">
			<div className="mx-auto max-w-6xl gap-x-8 md:grid md:grid-cols-2">
				<div className="mb-8 md:m-0">
					<ProductCoverImage src={product.image} alt="" />
				</div>
				<div className="col-span-1 flex flex-col space-y-3">
					<h1 className="max-w-96 text-2xl font-bold leading-snug md:mt-16">{product.name}</h1>
					<div className="font-semibold">{product.categoryId}</div>
					<div className="text-xl font-bold">{formatPrice(product.price)}</div>
					<div className="text-gray-500">{product.description}</div>
					<button type="button" className="btn btn-primary md:!mb-8 md:!mt-auto">
						Add to cart
					</button>
				</div>
				<div className="col-span-2 my-8">{product.longDescription}</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<RelatedProducts />
			</Suspense>
		</section>
	);
}
