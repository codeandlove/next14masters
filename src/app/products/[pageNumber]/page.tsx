import { Suspense } from "react";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import type { SortByKey, ActiveLinkItemType } from "@/ui/types";
import { getProductsList } from "@/api/graphql";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { type ProductItemFragment } from "@/gql/graphql";
import { CollectionsNavigation } from "@/ui/molecules/CollectionsNavigation";
import { SortBy } from "@/ui/atoms/SortBy";

const paginationCount = 5;

const paginationLinks: ActiveLinkItemType[] = Array.from(
	{ length: paginationCount },
	(_, index) => {
		return { name: `${index + 1}`, url: `/products/${index + 1}`, exact: false };
	},
);

// export const generateStaticParams = async () => {
// 	return paginationLinks.map((_, index) => ({
// 		params: {
// 			pageNumber: index + 1,
// 		},
// 	}));
// };

export default async function ProductsListPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { sortby?: SortByKey };
}) {
	const products = (await getProductsList({
		pageNumber: params.pageNumber,
	})) as ProductItemFragment[];

	return (
		<>
			<PageTitle>All Products</PageTitle>
			<CollectionsNavigation />
			<SortBy />
			<ProductList products={products} sortby={searchParams.sortby || undefined} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
