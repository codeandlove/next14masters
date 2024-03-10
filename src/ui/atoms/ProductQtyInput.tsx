"use client";

import { useState } from "react";

export const ProductQtyInput = () => {
	const [qty, setQty] = useState(1);

	if (qty < 1) {
		setQty(1);
	}

	return (
		<div className="flex flex-nowrap items-center py-4">
			<button
				type="button"
				className="btn btn-secondary  h-12 w-12 rounded-md border border-gray-300 p-2 text-lg font-normal"
				onClick={() => setQty((qty) => qty - 1)}
			>
				-
			</button>
			<input
				className="form-input mx-2 h-12 w-12 appearance-none rounded-md border border-gray-300 p-2 text-center"
				type="number"
				name="quantity"
				value={qty}
				readOnly
			/>
			<button
				type="button"
				className="btn btn-secondary h-12 w-12 rounded-md border border-gray-300 p-2 text-lg font-normal"
				onClick={() => setQty((qty) => qty + 1)}
			>
				+
			</button>
		</div>
	);
};
