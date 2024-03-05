import {
	ProductsGetListDocument,
	type TypedDocumentString,
	type ProductsGetListQuery,
	CategoryGetBySlugDocument,
	type CategoryGetBySlugQuery,
	type ProductGetByIdQuery,
	ProductGetByIdDocument,
	type ProductItemFragment,
	CategoriesGetItemsDocument,
	type CategoriesGetItemsQuery,
	type CategoryItemFragment,
	type ProductGetBySlugQuery,
	ProductGetBySlugDocument,
	CollectionsGetItemsDocument,
	type CollectionsGetItemsQuery,
	CollectionGetBySlugDocument,
	type CollectionGetBySlugQuery,
	type CollectionItemFragment,
	type CartGetByIdQuery,
	CartGetByIdDocument,
	type CartCreateMutation,
	CartCreateDocument,
	type CartOrderFragment,
	type CartAddProductMutation,
	CartAddProductDocument,
	type CartUpdateProductQuantityMutation,
	CartUpdateProductQuantityDocument,
	type CartRemoveProductMutation,
	CartRemoveProductDocument,
} from "@/gql/graphql";

const take = 12;

const executeGraphql = async <TResult, TVariables>({
	query,
	variables,
	next,
	cache,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
}): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw new Error("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: variables,
		}),
		next: next,
		cache: cache,
	});

	type GraphqlResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse = (await res.json()) as GraphqlResponse<TResult>;

	if (graphqlResponse.errors) {
		console.log(graphqlResponse.errors);
		throw new Error(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse.data;
};

export const getProductsList = async (params: { pageNumber: string; search?: string }) => {
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { take: take, skip: (Number(params.pageNumber) - 1) * take, search: params.search },
	});

	return productGraphqlResponse.products.data;
};

export const getProductById = async ({ id }: { id: ProductItemFragment["id"] }) => {
	const graphqlResponse: ProductGetByIdQuery = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id: id },
	});

	return graphqlResponse.product;
};

export const getProductBySlug = async ({ slug }: { slug: ProductItemFragment["slug"] }) => {
	const graphqlResponse: ProductGetBySlugQuery = await executeGraphql({
		query: ProductGetBySlugDocument,
		variables: { slug: slug },
	});

	return graphqlResponse.product;
};

export const getCategoryBySlug = async (params: {
	slug: CategoryItemFragment["slug"];
	pageNumber: string;
}) => {
	const graphqlResponse: CategoryGetBySlugQuery = await executeGraphql({
		query: CategoryGetBySlugDocument,
		variables: {
			slug: params.slug,
			take: take,
			skip: (Number(params.pageNumber) - 1) * take,
		},
	});

	return graphqlResponse.category;
};

export const getCollectionBySlug = async (params: {
	slug: CollectionItemFragment["slug"];
	pageNumber: string;
}) => {
	const graphqlResponse: CollectionGetBySlugQuery = await executeGraphql({
		query: CollectionGetBySlugDocument,
		variables: {
			slug: params.slug,
			take: take,
			skip: (Number(params.pageNumber) - 1) * take,
		},
	});

	return graphqlResponse.collection;
};

export const getCategories = async (params: { pageNumber: string }) => {
	const take = 20;
	const graphqlResponse: CategoriesGetItemsQuery = await executeGraphql({
		query: CategoriesGetItemsDocument,
		variables: { take: 20, skip: (Number(params.pageNumber) - 1) * take },
	});

	return graphqlResponse.categories.data;
};

export const getCollections = async (params: { pageNumber: string }) => {
	const take = 20;
	const graphqlResponse: CollectionsGetItemsQuery = await executeGraphql({
		query: CollectionsGetItemsDocument,
		variables: { take: 20, skip: (Number(params.pageNumber) - 1) * take },
	});

	return graphqlResponse.collections.data;
};

export const getCartDataById = async ({ id }: { id: CartOrderFragment["id"] }) => {
	const graphqlResponse: CartGetByIdQuery = await executeGraphql({
		query: CartGetByIdDocument,
		variables: {
			id: id,
		},
		next: {
			tags: ["cart"],
		},
	});

	return graphqlResponse.order;
};

export const createNewCart = async () => {
	const graphqlResponse: CartCreateMutation = await executeGraphql({
		query: CartCreateDocument,
		variables: {},
	});

	return graphqlResponse.createOrder;
};

export const addOrderItem = async ({
	orderId,
	productId,
	quantity,
}: {
	orderId: string;
	productId: string;
	quantity: number;
}) => {
	const graphqlResponse: CartAddProductMutation = await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			orderId: orderId,
			productId: productId,
			quantity: quantity,
		},
	});

	return graphqlResponse.createOrderItem;
};

export const updateOrderItem = async ({
	orderId,
	productId,
	quantity,
}: {
	orderId: string;
	productId: string;
	quantity: number;
}) => {
	const graphqlResponse: CartUpdateProductQuantityMutation = await executeGraphql({
		query: CartUpdateProductQuantityDocument,
		variables: {
			orderId: orderId,
			productId: productId,
			quantity: quantity,
		},
	});

	return graphqlResponse.updateOrderItem;
};

export const removeOrderItem = async ({
	orderId,
	productId,
}: {
	orderId: string;
	productId: string;
}) => {
	const graphqlResponse: CartRemoveProductMutation = await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			orderId: orderId,
			productId: productId,
		},
	});

	return graphqlResponse.removeOrderItem;
};
