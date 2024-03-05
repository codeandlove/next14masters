"use client";

import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();

	return (
		<button type="submit" disabled={formStatus.pending} className="btn btn-primary md:!mb-8">
			Add to cart
		</button>
	);
};
