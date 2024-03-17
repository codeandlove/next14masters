import type { ActiveLinkItemType } from "@/ui/types";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { getCollections } from "@/api/graphql";

export const CollectionsNavigation = async () => {
	const storeCollections = await getCollections({ pageNumber: "1" });
	const collectionsLinks: ActiveLinkItemType[] = [];

	if (storeCollections.length) {
		const collectionLinks = storeCollections.map((collection) => ({
			name: collection.name,
			url: `/collections/${collection.slug}`,
		}));
		collectionsLinks.push(...collectionLinks);
	}

	return (
		<div className="container mx-auto flex flex-wrap justify-center py-4">
			<ul className="flex items-center space-x-8 px-4">
				{collectionsLinks.map((link, index) => (
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
