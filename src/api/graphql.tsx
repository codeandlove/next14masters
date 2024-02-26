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
} from "@/gql/graphql";

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
		console.log(query);
		throw new Error(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse.data;
};

export const getProductsList = async (params: { pageNumber: string }) => {
	const take = 20;
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql(
		ProductsGetListDocument,
		{ take: take, skip: (Number(params.pageNumber) - 1) * take },
	);

	return productGraphqlResponse.products.data;
};

export const getProductById = async ({ id }: { id: ProductItemFragment["id"] }) => {
	const graphqlResponse: ProductGetByIdQuery = await executeGraphql(ProductGetByIdDocument, {
		id: id,
	});

	return graphqlResponse.product;
};

export const getCategoryBySlug = async ({ slug }: { slug: string }) => {
	const graphqlResponse: CategoryGetBySlugQuery = await executeGraphql(CategoryGetBySlugDocument, {
		slug: slug,
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

export const testProducts = async () => {
	const graphqlResponse: ProductsGetListQuery = await executeGraphql(ProductsGetListDocument, {
		take: 20,
		skip: 0,
	});
	console.log(graphqlResponse.products);
	return graphqlResponse.products;
};
