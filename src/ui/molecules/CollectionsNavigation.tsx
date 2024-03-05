import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

export const CollectionsNavigation = ({ links }: { links: ActiveLinkItemType[] }) => {
	return (
		<div className="container mx-auto flex justify-center py-4">
			<ul className="flex items-center space-x-8 px-4">
				{links.map((link, index) => (
					<li className="py-2" key={`link-key-${index}`}>
						<ActiveLink href={link.url} exact={link.exact} activeClassName={`underline`}>
							{link.name}
						</ActiveLink>
					</li>
				))}
			</ul>
		</div>
	);
};
