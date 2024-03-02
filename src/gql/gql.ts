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
    "query CategoriesGetItems($skip: Int!, $take: Int!) {\n  categories(skip: $skip, take: $take) {\n    data {\n      id\n      name\n      slug\n      description\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.CategoriesGetItemsDocument,
    "query CategoryGetById($id: ID!, $take: Int!, $skip: Int!) {\n  category(id: $id) {\n    id\n    name\n    slug\n    description\n    products(take: $take, skip: $skip) {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetByIdDocument,
    "query CategoryGetBySlug($slug: String!, $skip: Int!, $take: Int!) {\n  category(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products(skip: $skip, take: $take) {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetBySlugDocument,
    "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n}": types.CollectionItemFragmentDoc,
    "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}": types.CategoryItemFragmentDoc,
    "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  longDescription\n  price\n  image\n  status\n  rating\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n}": types.ProductItemFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}": types.ProductGetBySlugDocument,
    "query ProductsGetList($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsSearch($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsSearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetItems($skip: Int!, $take: Int!) {\n  categories(skip: $skip, take: $take) {\n    data {\n      id\n      name\n      slug\n      description\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').CategoriesGetItemsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetById($id: ID!, $take: Int!, $skip: Int!) {\n  category(id: $id) {\n    id\n    name\n    slug\n    description\n    products(take: $take, skip: $skip) {\n      ...ProductItem\n    }\n  }\n}"): typeof import('./graphql').CategoryGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoryGetBySlug($slug: String!, $skip: Int!, $take: Int!) {\n  category(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products(skip: $skip, take: $take) {\n      ...ProductItem\n    }\n  }\n}"): typeof import('./graphql').CategoryGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n}"): typeof import('./graphql').CollectionItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}"): typeof import('./graphql').CategoryItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  longDescription\n  price\n  image\n  status\n  rating\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}"): typeof import('./graphql').ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsSearch($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsSearchDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
