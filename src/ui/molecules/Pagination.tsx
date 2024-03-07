"use client";

import { useSearchParams } from "next/navigation";
import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const Pagination = ({ links }: { links: ActiveLinkItemType[] }) => {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	let paramsString = "";

	if (params.keys()) {
		params.forEach((value, key) => {
			paramsString += `${key}=${value}&`;
		});

		paramsString = paramsString.slice(0, -1);
	}

	return (
		<div className="flex items-center justify-between">
			<ul className="flex items-center space-x-8 px-4" aria-label="Pagination">
				{links.map((link, index) => (
					<li className="py-8" key={`link-key-${index}`}>
						<ActiveLink
							href={`${link.url}${paramsString ? `?${paramsString}` : ""}`}
							exact={link.exact}
							activeClassName={`underline`}
						>
							{link.name}
						</ActiveLink>
					</li>
				))}
			</ul>
		</div>
	);
};
