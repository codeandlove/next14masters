import Link from "next/link";
import { ProductListCoverImage } from "@/ui/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductItemFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductListCoverImage src={product.image} alt="" />
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
