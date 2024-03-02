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

export default async function SearchPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { query: string };
}) {
	let products: ProductItemFragment[] | undefined;

	try {
		products = (await getProductsList({
			pageNumber: params.pageNumber,
			search: searchParams.query,
		})) as ProductItemFragment[];
	} catch (error) {
		return <p>There was an error fetching the products.</p>;
	}

	return (
		<>
			<PageTitle>{searchParams.query ? `Search results` : `All products`}</PageTitle>
			<Suspense>
				{products && <ProductList products={products} />}
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
