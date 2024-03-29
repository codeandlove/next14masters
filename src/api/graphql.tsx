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
	type ReviewCreateMutation,
	ReviewCreateDocument,
	type ReviewGetReviewsQuery,
	ReviewGetReviewsDocument,
	type PlaceOrderMutation,
	PlaceOrderDocument,
	type GetOrderListQuery,
	GetOrderListDocument,
	type ProductsGetListOfIdsQuery,
	ProductsGetListOfIdsDocument,
} from "@/gql/graphql";
import { sortByKey } from "@/ui/utils";

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

	return sortByKey(productGraphqlResponse.products.data, "id");
};

export const getProductsAll = async () => {
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql({
		query: ProductsGetListDocument,
		variables: { take: 50, skip: 0 },
	});

	return sortByKey(productGraphqlResponse.products.data, "id");
};

export const getProductsListOfIds = async ({ ids }: { ids: ProductItemFragment["id"][] }) => {
	const productGraphqlResponse: ProductsGetListOfIdsQuery = await executeGraphql({
		query: ProductsGetListOfIdsDocument,
		variables: { take: ids.length, skip: 0, ids: [...ids] },
	});

	return sortByKey(productGraphqlResponse.products.data, "id");
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

	return {
		...graphqlResponse.category,
		products: sortByKey(graphqlResponse.category.products, "id"),
	};
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

	return {
		...graphqlResponse.collection,
		products: sortByKey(graphqlResponse.collection.products, "id"),
	};
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

	return {
		...graphqlResponse.order,
		orderItems: sortByKey(graphqlResponse.order.orderItems, "id"),
	};
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

export const placeOrder = async ({
	orderId,
	email,
	userId,
	sessionId,
	totalAmount,
}: {
	orderId: string;
	email: string;
	userId: string | null;
	sessionId: string | null;
	totalAmount: number;
}) => {
	const graphqlResponse: PlaceOrderMutation = await executeGraphql({
		query: PlaceOrderDocument,
		variables: {
			orderId: orderId,
			email: email,
			userId: userId,
			sessionId: sessionId,
			totalAmount: totalAmount,
		},
	});

	return graphqlResponse.placeOrder;
};

export const createReview = async ({
	productId,
	headline,
	content,
	rating,
	name,
	email,
}: {
	productId: string;
	headline: string;
	content: string;
	rating: number;
	name: string;
	email: string;
}) => {
	const graphqlResponse: ReviewCreateMutation = await executeGraphql({
		query: ReviewCreateDocument,
		variables: {
			productId: productId,
			headline: headline,
			content: content,
			rating: rating,
			name: name,
			email: email,
		},
		next: {
			tags: [`${productId}_reviews`],
		},
	});

	return graphqlResponse.createReview;
};

export const getProductReviews = async ({ productId }: { productId: string }) => {
	const graphqlResponse: ReviewGetReviewsQuery = await executeGraphql({
		query: ReviewGetReviewsDocument,
		variables: { productId: productId },
	});

	return graphqlResponse.reviews;
};

export const getOrdersByUserId = async ({ userId }: { userId: string }) => {
	const graphqlResponse: GetOrderListQuery = await executeGraphql({
		query: GetOrderListDocument,
		variables: { userId: userId },
	});

	return graphqlResponse.orders;
};
