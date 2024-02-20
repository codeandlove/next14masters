import { getProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const products = await getProducts({ pageNumber: "1" });
	return products.map((product) => ({
		params: {
			productId: product.id,
		},
	}));
};

export default async function HomePage() {
	const products = await getProducts({ pageNumber: "1" });
	return (
		<>
			<div>Home page</div>
			<ProductList products={products} />
		</>
	);
}
