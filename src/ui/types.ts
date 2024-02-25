// export type ProductItemType = {
// 	id: string;
// 	slug?: string;
// 	coverImage: {
// 		src: string;
// 		alt: string;
// 	};
// 	category?: string;
// 	name: string;
// 	price: number;
// 	description: string;
// 	longDescription: string;
// };

export type CategoryItemType = {
	id: string;
	name: string;
	slug: string;
	description: string;
	products?: {
		id: string;
		name: string;
		slug: string;
		description: string;
		longDescription: string;
		categoryId: string;
		price: number;
		rating: number;
		image: string;
	}[];
};

export type ActiveLinkItemType = {
	name: string;
	url: string;
	exact?: boolean;
};

export type ProductsResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
	longDescription: string;
};
