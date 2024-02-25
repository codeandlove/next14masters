import { Suspense } from "react";
import { getProducts } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import type { ActiveLinkItemType } from "@/ui/types";
import { getProductsListGQL } from "@/api/graphql";

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
	const products = await getProducts({ pageNumber: params.pageNumber });
	const products_gql = await getProductsListGQL();
	return (
		<>
			<ProductList products={products} />
			<ProductList products={products_gql} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
