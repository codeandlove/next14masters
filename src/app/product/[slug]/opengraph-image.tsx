import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/api/graphql";
import { type ProductItemFragment } from "@/gql/graphql";

export const runtime = "edge";

export const alt = "next13 masters sklep";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function og({ params }: { params: { slug: string } }) {
	const product = (await getProductBySlug({ slug: params.slug })) as ProductItemFragment;

	return new ImageResponse(
		(
			<div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-xl"
				style={{
					background: `black`,
					color: `white`,
				}}
			>
				<div tw="w-96 h-96 flex items-center justify-center bg-black mb-4">
					<img tw="w-96 h-96 object-cover" src={product.image} alt={product.name} />
				</div>
				<p tw="font-sans uppercase m-0 p-0 text-3xl leading-4  mb-4">{product.name}</p>
				<p tw="font-serif m-0 p-0 font-black mb-4 max-w-lg text-center">{product.description}</p>
				<p tw="font-serif m-0 p-0 font-black mb-4">
					Category: {product.categories[0] && product.categories[0].name}
				</p>
			</div>
		),
	);
}
