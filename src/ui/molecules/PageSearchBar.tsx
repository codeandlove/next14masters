"use client";

import { type Route } from "next";
import { useRouter } from "next/navigation";

export const PageSearchBar = () => {
	const router = useRouter();
	const limit = 2;
	const time = 300;
	let locked = false;

	const searchByPhrase = async (phrase: string) => {
		if (phrase.length < limit || locked) {
			return;
		}

		locked = true;

		setTimeout(() => {
			locked = false;
			updateRoute(phrase);
		}, time);
	};

	const updateRoute = (phrase: string) => {
		router.push(`/search/?query=${phrase}` as Route);
	};

	return (
		<div className="flex items-center justify-between">
			<form className="flex items-center space-x-4">
				<label htmlFor="search" className="sr-only">
					Search products...
				</label>
				<input
					id="search"
					type="text"
					onChange={(e) => searchByPhrase(e.target.value)}
					className="h-10 w-full rounded-md border border-gray-300 px-4 focus:border-blue-300 focus:ring-blue-500"
					placeholder="Search products..."
				/>
			</form>
		</div>
	);
};
