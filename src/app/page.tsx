import { getProductsList } from "@/api/graphql";
import type { ProductItemFragment } from "@/gql/graphql";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const products = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];
	return products.map((product) => ({
		params: {
			productId: product.id,
		},
	}));
};

export default async function HomePage() {
	const products = (await getProductsList({ pageNumber: "1" })) as ProductItemFragment[];
	return (
		<>
			<PageTitle>Home Page</PageTitle>
			<ProductList products={products} />
		</>
	);
}
