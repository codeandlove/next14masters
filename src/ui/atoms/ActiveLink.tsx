"use client";

import type { Route } from "next";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const ActiveLink = ({
	href,
	activeClassName,
	exact,
	children,
}: {
	href: string;
	exact?: boolean;
	activeClassName: string;
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	let isActive = pathname === href;

	if (!isActive && !exact) {
		isActive = pathname.includes(href);
	}

	return (
		<Link
			href={href as Route}
			className={clsx(`text-blue-400 hover:text-blue-700`, isActive && activeClassName)}
			aria-current={isActive ? "page" : undefined}
		>
			{children}
		</Link>
	);
};
