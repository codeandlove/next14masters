import { notFound } from "next/navigation";
import { revalidateTag } from "next/cache";
import { getProductsList, getProductBySlug } from "@/api/graphql";
import { RelatedProducts } from "@/ui/organisms/RelatedProducts";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { formatPrice } from "@/ui/utils";
import { type ProductItemFragment } from "@/gql/graphql";
import { ProductQtyInput } from "@/ui/atoms/ProductQtyInput";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { addToCart } from "@/ui/actions";
import { getOrCreateCart } from "@/api/cart";
import { ProductReviews } from "@/ui/molecules/ProductReviews";

// export const generateMetadata = async ({
// 	params,
// }: {
// 	params: { slug: string };
// }): Promise<Metadata> => {
// 	const product = (await getProductBySlug({ slug: params.slug })) as ProductItemFragment;

// 	return {
// 		title: `${product.name}`,
// 		description: `${product.description}`,
// 		openGraph: {
// 			title: `${product.name}`,
// 			description: `${product.description}`,
// 			type: "website",
// 			images: [
// 				{
// 					url: product.image,
// 					alt: product.name,
// 				},
// 			],
// 		},
// 	};
// };

// export const generateStaticParams = async () => {
// 	const products = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];
// 	return products.map((product) => ({
// 		params: {
// 			slug: product.slug,
// 		},
// 	}));
// };

export default async function ProductPage({
	params,
}: {
	params: {
		slug: string;
	};
}) {
	const product = (await getProductBySlug({ slug: params.slug })) as ProductItemFragment;
	const relatedProducts = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];

	if (!product) {
		notFound();
	}

	async function addToCartAction(formData: FormData) {
		"use server";
		const cart = await getOrCreateCart();
		const productId = formData.get("productId") as string;
		const quantity = Number(formData.get("quantity"));

		await addToCart(cart.id, productId, quantity).finally(() => {
			revalidateTag("cart");
		});
	}

	return (
		<section className="w-full max-w-6xl space-y-10">
			<div className="gap-x-8 md:grid md:grid-cols-2">
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
					<div className="flex w-full items-center md:!mt-auto">
						<form className="flex w-full items-center md:justify-between" action={addToCartAction}>
							<input type="text" name="productId" defaultValue={product.id} hidden />
							<ProductQtyInput />
							<AddToCartButton />
						</form>
					</div>
				</div>
				<div className="col-span-2 my-8">{product.longDescription}</div>
			</div>
			<RelatedProducts products={relatedProducts} limit={8} />
			<ProductReviews productId={product.id} />
		</section>
	);
}
