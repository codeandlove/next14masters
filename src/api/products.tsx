import type { ProductItemType } from "@/ui/types";

type ProductsResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
	longDescription: string;
};

const apiProductsUrl = "https://naszsklep-api.vercel.app/api/products";

const productResponseItemToProductType = (product: ProductsResponseItem): ProductItemType => {
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

export const getProducts = async (params: { pageNumber: string }) => {
	let paramsResult = "?";
	if (params && params.pageNumber) {
		const take = 20;
		paramsResult = `${paramsResult}take=${take}&offset=${Number(params.pageNumber) * take}`;
	}

	const res = await fetch(`${apiProductsUrl}${params ? paramsResult : ""}`);
	const productsResponse = (await res.json()) as ProductsResponseItem[];
	return productsResponse.map(productResponseItemToProductType);
};

export const getProduct = async (id: ProductsResponseItem["id"]) => {
	const res = await fetch(`${apiProductsUrl}/${id}`);
	const productResponseItem = (await res.json()) as ProductsResponseItem;
	return productResponseItemToProductType(productResponseItem);
};
