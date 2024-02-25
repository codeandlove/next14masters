import type { ProductItemType, ProductsResponseItem } from "@/ui/types";

export const formatPrice = (price: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const productResponseItemToProductType = (
	product: ProductsResponseItem,
): ProductItemType => {
	return {
		id: product.id,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
		category: product.category,
		name: product.title,
		price: product.price,
		description: product.description,
		longDescription: product.longDescription,
	};
};
