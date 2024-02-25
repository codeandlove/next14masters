import type { ProductsResponseItem } from "@/ui/types";
import {productResponseItemToProductType} from "@/ui/utils";

const apiProductsUrl = "https://naszsklep-api.vercel.app/api/products";

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
