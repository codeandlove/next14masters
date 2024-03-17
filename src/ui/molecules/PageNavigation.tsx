"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const PageNavigation = ({ links }: { links: ActiveLinkItemType[] }) => {
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsActive(false);
	}, [pathname]);

	const activeClassName = `!right-0`;

	return (
		<>
			<div className="mx-4 cursor-pointer lg:hidden" onClick={() => setIsActive(!isActive)}>
				<MenuIcon />
			</div>
			<div
				className={clsx(
					`fixed right-full top-0 z-10 h-screen w-screen flex-1 bg-white transition-all lg:static lg:h-auto lg:w-auto lg:bg-transparent`,
					isActive && activeClassName,
				)}
			>
				<nav>
					<div className="container mx-auto">
						<ul className="flex flex-col p-4 lg:flex-row lg:items-center lg:space-x-4">
							{links.map((link, index) => (
								<li
									className="whitespace-nowrap py-4 text-sm font-normal uppercase lg:py-8"
									key={`link-key-${index}`}
								>
									<ActiveLink
										href={link.url}
										exact={link.exact}
										activeClassName={`border-b border-blue-400`}
									>
										{link.name}
									</ActiveLink>
								</li>
							))}
						</ul>
					</div>
				</nav>
			</div>
		</>
	);
};
