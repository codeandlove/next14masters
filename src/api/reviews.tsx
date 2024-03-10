"use server";

import { revalidateTag } from "next/cache";
import { createReview } from "@/api/graphql";

export const addReviewAction = async (formData: FormData) => {
	"use server";
	const productId = formData.get("productId") as string;

	const reviewData = {
		productId: productId,
		headline: formData.get("headline") as string,
		content: formData.get("content") as string,
		rating: Number(formData.get("rating")),
		name: formData.get("name") as string,
		email: formData.get("email") as string,
	};

	await createReview(reviewData).finally(() => {
		revalidateTag(`${productId}_reviews`);
	});
};
