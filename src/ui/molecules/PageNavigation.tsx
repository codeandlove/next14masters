import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const PageNavigation = ({ links }: { links: ActiveLinkItemType[] }) => {
	return (
		<nav>
			<div className="container mx-auto">
				<ul className="flex items-center space-x-8 px-4">
					{links.map((link, index) => (
						<li className="py-8 text-sm font-normal uppercase" key={`link-key-${index}`}>
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
	);
};
