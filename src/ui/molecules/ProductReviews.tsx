import { getProductReviews } from "@/api/graphql";
import { type ReviewItemFragment } from "@/gql/graphql";
import { ProductReviewForm } from "@/ui/atoms/ProductReviewForm";

export const ProductReviews = async ({ productId }: { productId: string }) => {
	const reviewList = (await getProductReviews({ productId: productId })) as ReviewItemFragment[];

	return (
		<div className="flex w-full gap-8">
			<ProductReviewForm productId={productId} reviewList={reviewList} />
		</div>
	);
};
