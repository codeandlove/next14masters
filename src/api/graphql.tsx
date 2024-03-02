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
} from "@/gql/graphql";

const take = 12;

const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
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
	});

	type GraphqlResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse = (await res.json()) as GraphqlResponse<TResult>;

	if (graphqlResponse.errors) {
		throw new Error(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse.data;
};

export const getProductsList = async (params: { pageNumber: string; search?: string }) => {
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql(
		ProductsGetListDocument,
		{ take: take, skip: (Number(params.pageNumber) - 1) * take, search: params.search },
	);

	return productGraphqlResponse.products.data;
};

export const getProductById = async ({ id }: { id: ProductItemFragment["id"] }) => {
	const graphqlResponse: ProductGetByIdQuery = await executeGraphql(ProductGetByIdDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getProductBySlug = async ({ slug }: { slug: ProductItemFragment["slug"] }) => {
	const graphqlResponse: ProductGetBySlugQuery = await executeGraphql(ProductGetBySlugDocument, {
		slug: slug,
	});

	return graphqlResponse.product;
};
export const getCategoryBySlug = async (params: {
	slug: CategoryItemFragment["slug"];
	pageNumber: string;
}) => {
	const graphqlResponse: CategoryGetBySlugQuery = await executeGraphql(CategoryGetBySlugDocument, {
		slug: params.slug,
		take: take,
		skip: (Number(params.pageNumber) - 1) * take,
	});

	return graphqlResponse.category;
};

export const getCategories = async (params: { pageNumber: string }) => {
	const take = 20;
	const graphqlResponse: CategoriesGetItemsQuery = await executeGraphql(
		CategoriesGetItemsDocument,
		{ take: 20, skip: (Number(params.pageNumber) - 1) * take },
	);

	return graphqlResponse.categories.data;
};
