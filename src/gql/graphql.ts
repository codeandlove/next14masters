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
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type Product = {
  categoryId: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  longDescription: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
};

export type Query = {
  categories: Array<Category>;
  category?: Maybe<Category>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryCategoriesArgs = {
  where: WhereInput;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type WhereInput = {
  slug: Scalars['String']['input'];
};

export type CategoryGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CategoryGetByIdQuery = { category?: { id: string, name: string, description: string, slug: string, products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> } | null };

export type CategoryGetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type CategoryGetBySlugQuery = { categories: Array<{ id: string, name: string, description: string, slug: string, products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> }> };

export type ProductItemFragment = { id: string, name: string, slug: string, description: string, longDescription: string, categoryId: string, price: number, rating: number, image: string } & { ' $fragmentName'?: 'ProductItemFragment' };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product?: { ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } } | null };

export type ProductsGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsGetListQuery = { products: Array<{ ' $fragmentRefs'?: { 'ProductItemFragment': ProductItemFragment } }> };

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
export const ProductItemFragmentDoc = new TypedDocumentString(`
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  categoryId
  price
  rating
  image
}
    `, {"fragmentName":"ProductItem"}) as unknown as TypedDocumentString<ProductItemFragment, unknown>;
export const CategoryGetByIdDocument = new TypedDocumentString(`
    query CategoryGetById($id: ID!) {
  category(id: $id) {
    id
    name
    description
    slug
    products {
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
  categoryId
  price
  rating
  image
}`) as unknown as TypedDocumentString<CategoryGetByIdQuery, CategoryGetByIdQueryVariables>;
export const CategoryGetBySlugDocument = new TypedDocumentString(`
    query CategoryGetBySlug($slug: String!) {
  categories(where: {slug: $slug}) {
    id
    name
    description
    slug
    products {
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
  categoryId
  price
  rating
  image
}`) as unknown as TypedDocumentString<CategoryGetBySlugQuery, CategoryGetBySlugQueryVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    ...ProductItem
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  categoryId
  price
  rating
  image
}`) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList {
  products(take: 10, skip: 0) {
    ...ProductItem
  }
}
    fragment ProductItem on Product {
  id
  name
  slug
  description
  longDescription
  categoryId
  price
  rating
  image
}`) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;