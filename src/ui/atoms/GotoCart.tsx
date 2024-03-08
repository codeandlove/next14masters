"use client";

import { useRouter } from "next/navigation";

export const GotoCart = () => {
	const router = useRouter();

	const handleClick = () => {
		router.back();

		setTimeout(() => {
			router.push("/cart");
		}, 200);
	};

	return (
		<button type="button" className="btn btn-primary w-full" onClick={handleClick}>
			Checkout now
		</button>
	);
};
