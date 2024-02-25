import {
	ProductsGetListDocument,
	type TypedDocumentString,
	type ProductsGetListQuery,
	CategoryGetBySlugDocument,
	type CategoryGetBySlugQuery,
} from "@/gql/graphql";
import type { CategoryItemType, ProductItemType } from "@/ui/types";

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

export const getProductsListGQL = async (): Promise<ProductItemType[]> => {
	const productGraphqlResponse: ProductsGetListQuery = await executeGraphql(
		ProductsGetListDocument,
		{},
	);

	const data = productGraphqlResponse.products;

	return data.map((product) => {
		if (!product) {
			throw new Error(`No product`);
		}

		return {
			id: product.id,
			name: product.name,
			slug: product.slug,
			coverImage: {
				src: product.image,
				alt: product.name,
			},
			categoryId: product.categoryId,
			rating: product.rating,
			price: product.price,
			description: product.description,
			longDescription: product.longDescription,
		};
	});
};

export const getCategoryBySlugGQL = async ({
	slug,
}: {
	slug: string;
}): Promise<CategoryItemType[]> => {
	const graphqlResponse: CategoryGetBySlugQuery = await executeGraphql(CategoryGetBySlugDocument, {
		slug: slug,
	});

	return graphqlResponse.categories;
};
