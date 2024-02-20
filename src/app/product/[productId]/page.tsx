import { Suspense } from "react";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/api/products";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { formatPrice } from "@/ui/utils";
import { MDX } from "@/ui/atoms/MDX";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProduct(params.productId);
	return {
		title: `${product.name}`,
		description: `${product.description}`,
		openGraph: {
			title: `${product.name}`,
			description: `${product.description}`,
			type: "website",
			images: [
				{
					url: product.coverImage.src,
					alt: product.coverImage.alt,
				},
			],
		},
	};
};

export const generateStaticParams = async () => {
	const products = await getProducts({ pageNumber: "1" });
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
	const product = await getProduct(params.productId);

	return (
		<section className="w-full space-y-10">
			<div className="mx-auto max-w-6xl gap-x-8 md:grid md:grid-cols-2">
				<div className="mb-8 md:m-0">
					<ProductCoverImage {...product.coverImage} />
				</div>
				<div className="col-span-1 flex flex-col space-y-3">
					<h1 className="max-w-96 text-2xl font-bold leading-snug md:mt-16">{product.name}</h1>
					<div className="font-semibold">{product.category}</div>
					<div className="text-xl font-bold">{formatPrice(product.price)}</div>
					<div className="text-gray-500">{product.description}</div>
					<button type="button" className="btn btn-primary md:!mb-8 md:!mt-auto">
						Add to cart
					</button>
				</div>
				<div className="col-span-2 my-8">
					<MDX>{product.longDescription}</MDX>
				</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<RelatedProducts />
			</Suspense>
		</section>
	);
}
