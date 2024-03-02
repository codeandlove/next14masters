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