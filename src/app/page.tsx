import { ProductList } from "@/app/ui/organisms/ProductList";
import type { ProductItemType } from "@/app/ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		coverImage: {
			src: "/assets/sofa.webp",
			alt: "Sofa",
		},
		category: "Furniture",
		name: "Sofa",
		price: 200,
	},
	{
		id: "2",
		coverImage: {
			src: "/assets/chair.webp",
			alt: "Chair",
		},
		category: "Furniture",
		name: "Chair",
		price: 50,
	},
	{
		id: "3",
		coverImage: {
			src: "/assets/table.webp",
			alt: "Table",
		},
		category: "Furniture",
		name: "Table",
		price: 100,
	},
	{
		id: "4",
		coverImage: {
			src: "/assets/bed.webp",
			alt: "Bed",
		},
		category: "Furniture",
		name: "Bed",
		price: 300,
	},
];

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList products={products} />
		</main>
	);
}
