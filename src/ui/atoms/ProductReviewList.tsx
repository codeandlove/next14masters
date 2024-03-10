import { type ReviewItemFragment } from "@/gql/graphql";

export const ProductReviewList = ({ reviewList }: { reviewList: ReviewItemFragment[] }) => {
	return (
		<div className="w-full border-t border-slate-200 py-8">
			<div className="mx-auto max-w-3xl" data-testid="add-review-form">
				<div className="space-y-4">
					<h2 className="text-xl font-bold">Customer reviews</h2>
					{reviewList && reviewList.length > 0 ? (
						reviewList.map((review, index) => (
							<div className="w-full" key={`review-item-${index}`}>
								<div className="flex items-center justify-between">
									<div className="flex flex-col">
										<span className="font-semibold text-slate-500">{review.name}</span>
										{review.rating && (
											<span className="mr-2 text-sm text-slate-500">
												Review: {review.rating}{" "}
												<span className="text-yellow-500">
													{"★".repeat(Math.floor(review.rating))}
												</span>
											</span>
										)}
									</div>
									<span className="text-xs text-slate-500">{review.email}</span>
								</div>
								<div className="rounded border border-slate-200 p-3 shadow-sm">
									<h3 className="text-lg font-bold">{review.headline}</h3>
									<p className="italic">{review.content}</p>
								</div>
							</div>
						))
					) : (
						<div>No reviews yet</div>
					)}
				</div>
			</div>
		</div>
	);
};
