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
		throw new Error(`GraphQL Error`, { cause: graphqlResponse.errors });
	}

	return graphqlResponse.data;
};

export const getProductsList = async (params: { pageNumber: string }) => {
	const take = 20;
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql(
		ProductsGetListDocument,
		{ take: take, skip: Number(params.pageNumber) * take },
	);

	return productGraphqlResponse.products;
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

	return graphqlResponse.categories;
};

export const getCategories = async () => {
	const graphqlResponse: CategoriesGetItemsQuery = await executeGraphql(
		CategoriesGetItemsDocument,
		{},
	);

	return graphqlResponse.categories;
};
