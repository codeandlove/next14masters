import { notFound } from "next/navigation";
import { Suspense } from "react";
import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCategoryBySlug } from "@/api/graphql";
import { type ProductItemFragment } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { type SortByKey, type ActiveLinkItemType } from "@/ui/types";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { SortBy } from "@/ui/atoms/SortBy";
import { CollectionsNavigation } from "@/ui/molecules/CollectionsNavigation";

const paginationCount = 20;

// export const generateStaticParams = async () => {
// 	const categories = await getCategories({ pageNumber: "1" });

// 	const paginationLinks: ActiveLinkItemType[] = Array.from(
// 		{ length: paginationCount },
// 		(_, index) => {
// 			return categories.map((category) => ({
// 				name: `${index + 1}`,
// 				url: `/categories/${category.slug}/${index + 1}`,
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
	const category = await getCategoryBySlug({ slug: params.slug, pageNumber: "1" });

	return {
		title: `${category.name}`,
		description: `${category.description}`,
		openGraph: {
			title: `${category.name}`,
			description: `${category.description}`,
			type: "website",
		},
	};
};

export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: { slug: string; pageNumber: string };
	searchParams: { sortby?: SortByKey };
}) {
	const category = await getCategoryBySlug({ slug: params.slug, pageNumber: params.pageNumber });

	if (!category) {
		throw notFound();
	}

	if (!category.products) {
		return (
			<>
				<p>This category does not contain any products.</p>
			</>
		);
	}

	const products = category.products as ProductItemFragment[];

	const paginationLinks: ActiveLinkItemType[] = Array.from(
		{ length: paginationCount },
		(_, index) => {
			return { name: `${index + 1}`, url: `/categories/${params.slug}/${index + 1}`, exact: true };
		},
	);

	return (
		<>
			<PageTitle>{category.name}</PageTitle>
			<CollectionsNavigation />
			<SortBy />
			<ProductList products={products} sortby={searchParams.sortby || undefined} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
