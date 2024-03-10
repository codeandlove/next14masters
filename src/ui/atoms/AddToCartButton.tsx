"use client";

import { ShoppingBagIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();

	return (
		<button
			data-testid="add-to-cart-button"
			type="submit"
			disabled={formStatus.pending}
			className="btn btn-primary flex w-full max-w-72 items-center justify-center"
		>
			<ShoppingBagIcon className="mr-2" /> Add to cart
		</button>
	);
};
