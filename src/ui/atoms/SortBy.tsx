"use client";

import { type Route } from "next";
import { useSearchParams, useRouter } from "next/navigation";

export const SortBy = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	let paramsString = "";

	if (params.keys()) {
		params.forEach((value, key) => {
			if (paramsString.indexOf(key) === -1 && key !== "sortby") {
				paramsString += `${key}=${value}&`;
			}
		});

		paramsString = paramsString.slice(0, -1);
	}

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortByValue = e.target.value;
		const sortQuery: Route = `?sortby=${sortByValue}${paramsString ? `&${paramsString}` : ""}`;

		router.push(sortQuery);
	};

	return (
		<div className="flex w-full items-center justify-end space-x-4 px-2 py-8">
			<div className="text-sm font-medium text-slate-500">Sort By</div>
			<select className="form-select" onChange={handleChange}>
				<option>Default</option>
				<option defaultValue="price" data-testid="sort-by-price">
					price
				</option>
				<option defaultValue="name" data-testid="sort-by-name">
					name
				</option>
				<option defaultValue="rating" data-testid="sort-by-rating">
					rating
				</option>
			</select>
		</div>
	);
};
