import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductList } from "@/ui/organisms/ProductList";
import { getCategories, getCategoryBySlug } from "@/api/graphql";
import { type ProductItemFragment } from "@/gql/graphql";
import { Pagination } from "@/ui/molecules/Pagination";
import { type ActiveLinkItemType } from "@/ui/types";
import { PageTitle } from "@/ui/atoms/PageTitle";

const paginationCount = 20;

export const generateStaticParams = async () => {
	const categories = await getCategories({pageNumber: "1"});
	
	const paginationLinks: ActiveLinkItemType[] = Array.from(
		{ length: paginationCount },
		(_, index) => {
			return categories.map(category => 
				({ name: `${index + 1}`, url: `/category/${category.slug}/${index + 1}`, exact: true }));
		}
	).reduce((p,n) => p.concat(n),[]);

	return paginationLinks.map((_, index) => ({
		params: {
			pageNumber: index + 1,
		},
	}));
};

export default async function CategoryPage({
	params,
}: {
	params: { slug: string; pageNumber: string };
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
			return { name: `${index + 1}`, url: `/category/${params.slug}/${index + 1}`, exact: true };
		},
	);

	return (
		<>
			<PageTitle>{category.name}</PageTitle>
			<ProductList products={products} />
			<Suspense>
				<Pagination links={paginationLinks} />
			</Suspense>
		</>
	);
}
