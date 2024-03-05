import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCollectionBySlug } from "@/api/graphql";
import { type ProductItemFragment } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { type ActiveLinkItemType } from "@/ui/types";
import { PageTitle } from "@/ui/atoms/PageTitle";

const paginationCount = 20;

// export const generateStaticParams = async () => {
// 	const collections = await getCollections({ pageNumber: "1" });

// 	const paginationLinks: ActiveLinkItemType[] = Array.from(
// 		{ length: paginationCount },
// 		(_, index) => {
// 			return collections.map((collection) => ({
// 				name: `${index + 1}`,
// 				url: `/collections/${collection.slug}/${index + 1}`,
// 				exact: true,
// 			}));
// 		},
// 	).reduce((p, n) => p.concat(n), []);

// 	return paginationLinks.map((_, index) => ({
// 		params: {
// 			pageNumber: index + 1,
// 		},
// 	}));
// };

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> => {
	const collection = await getCollectionBySlug({ slug: params.slug, pageNumber: "1" });

	return {
		title: `${collection.name}`,
		description: `${collection.description}`,
		openGraph: {
			title: `${collection.name}`,
			description: `${collection.description}`,
			type: "website",
		},
	};
};

export default async function CollectionPage({
	params,
}: {
	params: { slug: string; pageNumber: string };
}) {
	const collection = await getCollectionBySlug({
		slug: params.slug,
		pageNumber: params.pageNumber,
	});

	if (!collection) {
		throw notFound();
	}

	if (!collection.products) {
		return (
			<>
				<p>This collection does not contain any products.</p>
			</>
		);
	}

	const products = collection.products as ProductItemFragment[];

	const paginationLinks: ActiveLinkItemType[] = Array.from(
		{ length: paginationCount },
		(_, index) => {
			return { name: `${index + 1}`, url: `/collections/${params.slug}/${index + 1}`, exact: true };
		},
	);

	return (
		<>
			<PageTitle>{collection.name}</PageTitle>
			<ProductList products={products} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
