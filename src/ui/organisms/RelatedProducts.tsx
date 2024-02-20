import { getProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export const RelatedProducts = async () => {
	const products = await getProducts({ pageNumber: "1" });
	return (
		<section>
			<h2 className="mb-4 text-center text-xl font-bold leading-snug">Related Products</h2>
			<ProductList products={products.slice(-4)} />
		</section>
	);
};
