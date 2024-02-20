"use client";

import { useState } from "react";

export const ProductQtyInput = () => {
	const [qty, setQty] = useState(0);

	return (
		<div>
			<button
				className="h-10 w-10 rounded-md border border-gray-300"
				onClick={() => setQty((qty) => qty - 1)}
			>
				-
			</button>
			<input
				className="h-10 w-16 rounded-md border border-gray-300 text-center"
				type="number"
				value={qty}
				readOnly
			/>
			<button
				className="h-10 w-10 rounded-md border border-gray-300"
				onClick={() => setQty((qty) => qty + 1)}
			>
				+
			</button>
		</div>
	);
};
