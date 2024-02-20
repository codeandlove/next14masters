export type ProductItemType = {
	id: string;
	coverImage: {
		src: string;
		alt: string;
	};
	category: string;
	name: string;
	price: number;
	description: string;
	longDescription: string;
};

export type ActiveLinkItemType = {
	name: string;
	url: string;
	exact?: boolean;
};
