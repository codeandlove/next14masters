import { Suspense } from "react";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import type { ActiveLinkItemType } from "@/ui/types";
import { getProductsList } from "@/api/graphql";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { type ProductItemFragment } from "@/gql/graphql";

const paginationCount = 20;

const paginationLinks: ActiveLinkItemType[] = Array.from(
	{ length: paginationCount },
	(_, index) => {
		return { name: `${index + 1}`, url: `/products/${index + 1}`, exact: true };
	},
);

export const generateStaticParams = async () => {
	return paginationLinks.map((_, index) => ({
		params: {
			pageNumber: index + 1,
		},
	}));
};

export default async function ProductsListPage({ params }: { params: { pageNumber: string } }) {
	const products = (await getProductsList({
		pageNumber: params.pageNumber,
	})) as ProductItemFragment[];

	return (
		<>
			<PageTitle>All Products</PageTitle>
			<ProductList products={products} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
