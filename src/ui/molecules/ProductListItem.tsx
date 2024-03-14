import Link from "next/link";
import { ProductListCoverImage } from "@/ui/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemFragment } from "@/gql/graphql";

export const ProductListItem = ({ product, showDescription }: { product: ProductItemFragment, showDescription?: boolean }) => {
	return (
		<>
			{product && (
				<li>
					<Link href={`/product/${product.slug}`}>
						<article>
							<ProductListCoverImage src={product.image} alt="" />
							<ProductListItemDescription product={product} showDescription={showDescription} />
						</article>
					</Link>
				</li>
			)}
		</>
	);
};
