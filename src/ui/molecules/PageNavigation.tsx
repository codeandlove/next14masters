import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const PageNavigation = ({ links }: { links: ActiveLinkItemType[] }) => {
	return (
		<nav>
			<div className="container mx-auto">
				<ul className="flex items-center space-x-8 px-4">
					{links.map((link, index) => (
						<li className="py-8" key={`link-key-${index}`}>
							<ActiveLink href={link.url} exact={link.exact} activeClassName={`underline`}>
								{link.name}
							</ActiveLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};
