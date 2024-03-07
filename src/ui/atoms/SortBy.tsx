"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const SortBy = () => {
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

	return (
		<div className="flex w-full items-center justify-end space-x-4 px-2 py-8">
			<div className="text-sm font-medium text-slate-500">Sort By</div>
			<Link
				href={`?sortby=price${paramsString ? `&${paramsString}` : ""}`}
				className="btn btn-small btn-secondary text-xs"
			>
				Price
			</Link>
			<Link
				href={`?sortby=name${paramsString ? `&${paramsString}` : ""}`}
				className="btn btn-small btn-secondary text-xs"
			>
				Name
			</Link>
			<Link
				href={`?sortby=rating${paramsString ? `&${paramsString}` : ""}`}
				className="btn btn-small btn-secondary text-xs"
			>
				Rating
			</Link>
		</div>
	);
};
