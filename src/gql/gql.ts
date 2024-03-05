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
    "mutation CartAddProduct($orderId: ID!, $productId: ID!, $quantity: Int!) {\n  createOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {\n    id\n    status\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate {\n  createOrder {\n    id\n    status\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(id: $id) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        id\n        name\n        description\n        image\n        price\n        status\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveProduct($orderId: ID!, $productId: ID!) {\n  removeOrderItem(orderId: $orderId, productId: $productId) {\n    id\n    status\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartUpdateProductQuantity($orderId: ID!, $productId: ID!, $quantity: Int!) {\n  updateOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {\n    id\n  }\n}": types.CartUpdateProductQuantityDocument,
    "query CategoriesGetItems($skip: Int!, $take: Int!) {\n  categories(skip: $skip, take: $take) {\n    data {\n      id\n      name\n      slug\n      description\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.CategoriesGetItemsDocument,
    "query CategoryGetById($id: ID!, $take: Int!, $skip: Int!) {\n  category(id: $id) {\n    id\n    name\n    slug\n    description\n    products(take: $take, skip: $skip) {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetByIdDocument,
    "query CategoryGetBySlug($slug: String!, $skip: Int!, $take: Int!) {\n  category(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products(skip: $skip, take: $take) {\n      ...ProductItem\n    }\n  }\n}": types.CategoryGetBySlugDocument,
    "query CollectionGetBySlug($slug: String!, $skip: Int!, $take: Int!) {\n  collection(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products(skip: $skip, take: $take) {\n      ...ProductItem\n    }\n  }\n}": types.CollectionGetBySlugDocument,
    "query CollectionsGetItems($skip: Int!, $take: Int!) {\n  collections(skip: $skip, take: $take) {\n    data {\n      id\n      name\n      slug\n      description\n    }\n    meta {\n      count\n      total\n    }\n  }\n}": types.CollectionsGetItemsDocument,
    "fragment CartOrder on Order {\n  id\n}": types.CartOrderFragmentDoc,
    "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  product {\n    id\n    name\n    description\n    image\n    price\n    status\n  }\n}": types.CartOrderItemFragmentDoc,
    "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}": types.CategoryItemFragmentDoc,
    "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n}": types.CollectionItemFragmentDoc,
    "fragment ProductItem on Product {\n  id\n  name\n  slug\n  description\n  longDescription\n  price\n  image\n  status\n  rating\n  categories {\n    name\n    slug\n  }\n  collections {\n    name\n    slug\n  }\n}": types.ProductItemFragmentDoc,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetBySlug($slug: String!) {\n  product(slug: $slug) {\n    ...ProductItem\n    categories {\n      ...CategoryItem\n    }\n    collections {\n      ...CollectionItem\n    }\n  }\n}": types.ProductGetBySlugDocument,
    "query ProductsGetList($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsSearch($skip: Int!, $take: Int!, $search: String) {\n  products(take: $take, skip: $skip, search: $search) {\n    data {\n      ...ProductItem\n    }\n    meta {\n      total\n      count\n    }\n  }\n}": types.ProductsSearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $productId: ID!, $quantity: Int!) {\n  createOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {\n    id\n    status\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder {\n    id\n    status\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(id: $id) {\n    id\n    orderItems {\n      id\n      quantity\n      product {\n        id\n        name\n        description\n        image\n        price\n        status\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($orderId: ID!, $productId: ID!) {\n  removeOrderItem(orderId: $orderId, productId: $productId) {\n    id\n    status\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartUpdateProductQuantity($orderId: ID!, $productId: ID!, $quantity: Int!) {\n  updateOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {\n    id\n  }\n}"): typeof import('./graphql').CartUpdateProductQuantityDocument;
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
export function graphql(source: "query CollectionGetBySlug($slug: String!, $skip: Int!, $take: Int!) {\n  collection(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products(skip: $skip, take: $take) {\n      ...ProductItem\n    }\n  }\n}"): typeof import('./graphql').CollectionGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetItems($skip: Int!, $take: Int!) {\n  collections(skip: $skip, take: $take) {\n    data {\n      id\n      name\n      slug\n      description\n    }\n    meta {\n      count\n      total\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetItemsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrder on Order {\n  id\n}"): typeof import('./graphql').CartOrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  product {\n    id\n    name\n    description\n    image\n    price\n    status\n  }\n}"): typeof import('./graphql').CartOrderItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CategoryItem on Category {\n  id\n  name\n  slug\n  description\n}"): typeof import('./graphql').CategoryItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionItem on Collection {\n  id\n  name\n  slug\n  description\n}"): typeof import('./graphql').CollectionItemFragmentDoc;
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
