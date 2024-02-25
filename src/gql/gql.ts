/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoryGetById($id: ID!) {\n  category(id: $id) {\n    id\n    name\n    description\n    slug\n    products {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetByIdDocument,
    "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    description\n    slug\n    products {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetBySlugDocument,
    "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  longDescription\n  categoryId\n  price\n  rating\n  image\n}": types.ProductItemFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductItem\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetList {\n  products(take: 10, skip: 0) {\n    ...ProductItem\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetById($id: ID!) {\n  category(id: $id) {\n    id\n    name\n    description\n    slug\n    products {\n      ...ProductItem\n    }\n  }\n}"): typeof import('./graphql').CategoryGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    description\n    slug\n    products {\n      ...ProductItem\n    }\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  longDescription\n  categoryId\n  price\n  rating\n  image\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList {\n  products(take: 10, skip: 0) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
