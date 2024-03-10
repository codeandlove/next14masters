"use client";

import { useOptimistic } from "react";
import { type ReviewItemFragment, type ProductItemFragment } from "@/gql/graphql";
import { ProductReviewList } from "@/ui/atoms/ProductReviewList";
import { addReviewAction } from "@/api/reviews";

export const ProductReviewForm = ({
	productId,
	reviewList,
}: {
	productId: ProductItemFragment["id"];
	reviewList: ReviewItemFragment[];
}) => {
	const ratingAmount = 5;
	const ratingAmountArray = Array.from({ length: ratingAmount }, (_, index) => {
		return { value: ratingAmount - index, label: `Rate ${index + 1}`, id: `rate-${index + 1}` };
	});

	const [optimisticReviewList, setOptimisticReviewList] = useOptimistic(
		reviewList,
		(_state, newReviewList: ReviewItemFragment[]) => newReviewList,
	);

	const addNewReview = async (formData: FormData) => {
		const newReviewData = {
			id: "",
			createdAt: new Date(),
			headline: formData.get("headline") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")),
			name: formData.get("name") as string,
			email: formData.get("email") as string,
		};

		if (newReviewData) {
			setOptimisticReviewList([...reviewList, newReviewData]);
		}

		return addReviewAction(formData);
	};

	return (
		<>
			<div className="w-full border-t border-slate-200 py-8">
				<form action={addNewReview} className="mx-auto max-w-3xl" data-testid="add-review-form">
					<input type="text" name="productId" defaultValue={productId} hidden />
					<div className="space-y-2">
						<h2 className="text-xl font-bold">Add a review</h2>
						<div className="form-control">
							<label htmlFor="headline" className="form-label required">
								Review title
							</label>
							<input type="text" id="headline" name="headline" className="form-input" required />
						</div>
						<div className="form-control">
							<label htmlFor="content" className="form-label required">
								Review content
							</label>
							<textarea id="content" name="content" className="form-input" required />
						</div>
						<div className="form-control">
							<legend className="form-label required">Your Rating</legend>
							{ratingAmountArray.map((rating, index) => (
								<div className="form-radio-control" key={`rating-input-${index}`}>
									<input
										defaultValue={rating.value}
										type="radio"
										id={rating.id}
										name="rating"
										className="form-input"
										required
									/>
									<label htmlFor={rating.id} className="form-label required">
										<span className="sr-only">{rating.label}</span>
										<span className="text-xl text-yellow-500">
											{"★".repeat(Math.floor(ratingAmount) - index)}
										</span>
									</label>
								</div>
							))}
						</div>
						<div className="form-control">
							<label htmlFor="name" className="form-label required">
								Your name
							</label>
							<input type="text" id="name" name="name" className="form-input" required />
						</div>
						<div className="form-control">
							<label htmlFor="email" className="form-label required">
								Email
							</label>
							<input type="email" id="email" name="email" className="form-input" required />
						</div>
						<div className="form-control">
							<button type="submit" className="btn btn-primary w-64">
								Submit your review
							</button>
						</div>
					</div>
				</form>
			</div>
			<ProductReviewList reviewList={optimisticReviewList} />
		</>
	);
};
