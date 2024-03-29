"use client";

import { SearchIcon } from "lucide-react";
import { type Route } from "next";
import { useRouter } from "next/navigation";
import { searchAction } from "@/api/search";

export const PageSearchBar = () => {
	const router = useRouter();
	const limit = 0;
	const time = 1000;
	let timeout: NodeJS.Timeout | number | null = null;

	const applySearchByKeyEnter = async (event: React.KeyboardEvent<HTMLDivElement>) => {
		const target = event.target as HTMLInputElement;
		const phrase: string = target.value;

		if (event.key === "Enter" && phrase && phrase.length > limit) {
			event.preventDefault();
			router.push(`/search/?query=${phrase}` as Route);
		}
	};

	const searchByPhrase = async (phrase: string) => {
		if (phrase.length < limit) {
			return;
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			updateRoute(phrase);
		}, time);
	};

	const updateRoute = (phrase: string) => {
		router.replace(`/search/?query=${phrase}` as Route);
	};

	return (
		<div className="mx-4 flex items-center justify-between md:ml-auto md:mr-4" aria-label="search">
			<form action={searchAction} className="relative flex items-center">
				<label htmlFor="search" className="sr-only">
					Search products...
				</label>
				<input
					role="searchbox"
					tabIndex={0}
					id="search"
					type="text"
					name="search"
					onChange={(e) => searchByPhrase(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => applySearchByKeyEnter(e)}
					className="form-input h-10 w-full rounded-md border border-gray-300 px-4 pr-10 text-sm placeholder:font-normal placeholder:text-slate-300 focus:border-blue-300 focus:ring-blue-500"
					placeholder="Search products..."
				/>
				<button type="submit" className="absolute right-2">
					<SearchIcon size={24} className="text-slate-500" />
				</button>
			</form>
		</div>
	);
};
