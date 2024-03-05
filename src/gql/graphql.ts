/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};


export type CategoryProductsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: Meta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};


export type CollectionProductsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: Meta;
};

export type Meta = {
  count: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Mutation = {
  createOrder: Order;
  createOrderItem: Order;
  removeOrderItem: Order;
  updateOrderItem: Order;
};


export type MutationCreateOrderItemArgs = {
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationRemoveOrderItemArgs = {
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationUpdateOrderItemArgs = {
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines?: Maybe<Scalars['String']['output']>;
  orderItems: Array<OrderItem>;
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  id: Scalars['ID']['output'];
  orderId: Scalars['ID']['output'];
  product: Product;
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  longDescription: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: Meta;
};

export type ProductsSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE';

export type Query = {
  categories: CategoryList;
  category: Category;
  collection: Collection;
  collections: CollectionList;
  order: Order;
  product: Product;
  products: ProductList;
};


export type QueryCategoriesArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<OrderStatus>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductsSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type CartAddProductMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartAddProductMutation = { createOrderItem: { id: string, status: OrderStatus } };

export type CartCreateMutationVariables = Exact<{ [key: string]: never; }>;


export type CartCreateMutation = { createOrder: { id: string, status: OrderStatus } };

export type CartGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CartGetByIdQuery = { order: { id: string, orderItems: Array<{ id: string, quantity: number, product: { id: string, name: string, description: string, image: string, price: number, status: string } }> } };

export type CartRemoveProductMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveProductMutation = { removeOrderItem: { id: string, status: OrderStatus } };

export type CartUpdateProductQuantityMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartUpdateProductQuantityMutation = { updateOrderItem: { id: string } };

export type CategoriesGetItemsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type CategoriesGetItemsQuery = { categories: { data: Array<{ id: string, name: string, slug: string, description: string }>, meta: { count: number, total: number } } };

export type CategoryGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type CategoryGetByIdQuery = { category: { id: string, name: string, slug: string, description: string, products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> } };

export type CategoryGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type CategoryGetBySlugQuery = { category: { id: string, name: string, slug: string, description: string, products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> } };

export type CollectionGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type CollectionGetBySlugQuery = { collection: { id: string, name: string, slug: string, description: string, products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> } };

export type CollectionsGetItemsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type CollectionsGetItemsQuery = { collections: { data: Array<{ id: string, name: string, slug: string, description: string }>, meta: { count: number, total: number } } };

export type CartOrderFragment = { id: string } & { ' $fragmentName'?: 'CartOrderFragment' };

export type CartOrderItemFragment = { id: string, quantity: number, product: { id: string, name: string, description: string, image: string, price: number, status: string } } & { ' $fragmentName'?: 'CartOrderItemFragment' };

export type CategoryItemFragment = { id: string, name: string, slug: string, description: string } & { ' $fragmentName'?: 'CategoryItemFragment' };

export type CollectionItemFragment = { id: string, name: string, slug: string, description: string } & { ' $fragmentName'?: 'CollectionItemFragment' };

export type ProductItemFragment = { id: string, name: string, slug: string, description: string, longDescription: string, price: number, image: string, status: string, rating: number, categories: Array<{ name: string, slug: string }>, collections: Array<{ name: string, slug: string }> } & { ' $fragmentName'?: 'ProductItemFragment' };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product: (
    { categories: Array<{ ' $fragmentRefs'?: { 'CategoryItemFragment': CategoryItemFragment } }>, collections: Array<{ ' $fragmentRefs'?: { 'CollectionItemFragment': CollectionItemFragment } }> }
    & { ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }
  ) };

export type ProductGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductGetBySlugQuery = { product: (
    { categories: Array<{ ' $fragmentRefs'?: { 'CategoryItemFragment': CategoryItemFragment } }>, collections: Array<{ ' $fragmentRefs'?: { 'CollectionItemFragment': CollectionItemFragment } }> }
    & { ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }
  ) };

export type ProductsGetListQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsGetListQuery = { products: { data: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }>, meta: { total: number, count: number } } };

export type ProductsSearchQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsSearchQuery = { products: { data: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }>, meta: { total: number, count: number } } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CartOrderFragmentDoc = new TypedDocumentString(`
    fragment CartOrder on Order {
  id
}
    `, {"fragmentName":"CartOrder"}) as unknown as TypedDocumentString<CartOrderFragment, unknown>;
export const CartOrderItemFragmentDoc = new TypedDocumentString(`
    fragment CartOrderItem on OrderItem {
  id
  quantity
  product {
    id
    name
    description
    image
    price
    status
  }
}
    `, {"fragmentName":"CartOrderItem"}) as unknown as TypedDocumentString<CartOrderItemFragment, unknown>;
export const CategoryItemFragmentDoc = new TypedDocumentString(`
    fragment CategoryItem on Category {
  id
  name
  slug
  description
}
    `, {"fragmentName":"CategoryItem"}) as unknown as TypedDocumentString<CategoryItemFragment, unknown>;
export const CollectionItemFragmentDoc = new TypedDocumentString(`
    fragment CollectionItem on Collection {
  id
  name
  slug
  description
}
    `, {"fragmentName":"CollectionItem"}) as unknown as TypedDocumentString<CollectionItemFragment, unknown>;
export const ProductItemFragmentDoc = new TypedDocumentString(`
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}
    `, {"fragmentName":"ProductItem"}) as unknown as TypedDocumentString<ProductItemFragment, unknown>;
export const CartAddProductDocument = new TypedDocumentString(`
    mutation CartAddProduct($orderId: ID!, $productId: ID!, $quantity: Int!) {
  createOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {
    id
    status
  }
}
    `) as unknown as TypedDocumentString<CartAddProductMutation, CartAddProductMutationVariables>;
export const CartCreateDocument = new TypedDocumentString(`
    mutation CartCreate {
  createOrder {
    id
    status
  }
}
    `) as unknown as TypedDocumentString<CartCreateMutation, CartCreateMutationVariables>;
export const CartGetByIdDocument = new TypedDocumentString(`
    query CartGetById($id: ID!) {
  order(id: $id) {
    id
    orderItems {
      id
      quantity
      product {
        id
        name
        description
        image
        price
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CartGetByIdQuery, CartGetByIdQueryVariables>;
export const CartRemoveProductDocument = new TypedDocumentString(`
    mutation CartRemoveProduct($orderId: ID!, $productId: ID!) {
  removeOrderItem(orderId: $orderId, productId: $productId) {
    id
    status
  }
}
    `) as unknown as TypedDocumentString<CartRemoveProductMutation, CartRemoveProductMutationVariables>;
export const CartUpdateProductQuantityDocument = new TypedDocumentString(`
    mutation CartUpdateProductQuantity($orderId: ID!, $productId: ID!, $quantity: Int!) {
  updateOrderItem(orderId: $orderId, productId: $productId, quantity: $quantity) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartUpdateProductQuantityMutation, CartUpdateProductQuantityMutationVariables>;
export const CategoriesGetItemsDocument = new TypedDocumentString(`
    query CategoriesGetItems($skip: Int!, $take: Int!) {
  categories(skip: $skip, take: $take) {
    data {
      id
      name
      slug
      description
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<CategoriesGetItemsQuery, CategoriesGetItemsQueryVariables>;
export const CategoryGetByIdDocument = new TypedDocumentString(`
    query CategoryGetById($id: ID!, $take: Int!, $skip: Int!) {
  category(id: $id) {
    id
    name
    slug
    description
    products(take: $take, skip: $skip) {
      ...ProductItem
    }
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<CategoryGetByIdQuery, CategoryGetByIdQueryVariables>;
export const CategoryGetBySlugDocument = new TypedDocumentString(`
    query CategoryGetBySlug($slug: String!, $skip: Int!, $take: Int!) {
  category(slug: $slug) {
    id
    name
    slug
    description
    products(skip: $skip, take: $take) {
      ...ProductItem
    }
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<CategoryGetBySlugQuery, CategoryGetBySlugQueryVariables>;
export const CollectionGetBySlugDocument = new TypedDocumentString(`
    query CollectionGetBySlug($slug: String!, $skip: Int!, $take: Int!) {
  collection(slug: $slug) {
    id
    name
    slug
    description
    products(skip: $skip, take: $take) {
      ...ProductItem
    }
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<CollectionGetBySlugQuery, CollectionGetBySlugQueryVariables>;
export const CollectionsGetItemsDocument = new TypedDocumentString(`
    query CollectionsGetItems($skip: Int!, $take: Int!) {
  collections(skip: $skip, take: $take) {
    data {
      id
      name
      slug
      description
    }
    meta {
      count
      total
    }
  }
}
    `) as unknown as TypedDocumentString<CollectionsGetItemsQuery, CollectionsGetItemsQueryVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    ...ProductItem
    categories {
      ...CategoryItem
    }
    collections {
      ...CollectionItem
    }
  }
}
    fragment CategoryItem on Category {
  id
  name
  slug
  description
}
fragment CollectionItem on Collection {
  id
  name
  slug
  description
}
fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductGetBySlugDocument = new TypedDocumentString(`
    query ProductGetBySlug($slug: String!) {
  product(slug: $slug) {
    ...ProductItem
    categories {
      ...CategoryItem
    }
    collections {
      ...CollectionItem
    }
  }
}
    fragment CategoryItem on Category {
  id
  name
  slug
  description
}
fragment CollectionItem on Collection {
  id
  name
  slug
  description
}
fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<ProductGetBySlugQuery, ProductGetBySlugQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($skip: Int!, $take: Int!, $search: String) {
  products(take: $take, skip: $skip, search: $search) {
    data {
      ...ProductItem
    }
    meta {
      total
      count
    }
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
export const ProductsSearchDocument = new TypedDocumentString(`
    query ProductsSearch($skip: Int!, $take: Int!, $search: String) {
  products(take: $take, skip: $skip, search: $search) {
    data {
      ...ProductItem
    }
    meta {
      total
      count
    }
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  price
  image
  status
  rating
  categories {
    name
    slug
  }
  collections {
    name
    slug
  }
}`) as unknown as TypedDocumentString<ProductsSearchQuery, ProductsSearchQueryVariables>;