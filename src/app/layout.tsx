import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageNavigation } from "@/ui/molecules/PageNavigation";
import { type ActiveLinkItemType } from "@/ui/types";
import { getCategories, getCollections } from "@/api/graphql";
import { PageSearchBar } from "@/ui/molecules/PageSearchBar";
import { CollectionsNavigation } from "@/ui/molecules/CollectionsNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Super Store",
	description: "Super Store - The best furniture store in the world!",
};

const primaryPageLinks: ActiveLinkItemType[] = [
	{ name: "Home Page", url: "/", exact: true },
	{ name: "All", url: "/products" },
];

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const storeCategories = await getCategories({ pageNumber: "1" });
	const storeCollections = await getCollections({ pageNumber: "1" });

	const pageLinks = [...primaryPageLinks];
	const collectionsLinks: ActiveLinkItemType[] = [];

	if (storeCategories.length) {
		const categoryLinks = storeCategories.map((category) => ({
			name: category.name,
			url: `/categories/${category.slug}`,
		}));
		pageLinks.push(...categoryLinks);
	}

	if (storeCollections.length) {
		const collectionLinks = storeCollections.map((collection) => ({
			name: collection.name,
			url: `/collections/${collection.slug}`,
		}));
		collectionsLinks.push(...collectionLinks);
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				<header className="pb-32">
					<div className="fixed inset-x-0 top-0 z-10 bg-slate-100 shadow-2xl shadow-black/10">
						<div className="container mx-auto flex items-center justify-between">
							<PageNavigation links={pageLinks} />
							<PageSearchBar />
						</div>
					</div>
				</header>
				<main className="my-4 px-4">
					<CollectionsNavigation links={collectionsLinks} />
					<section className="container mx-auto flex min-h-screen flex-col items-center">
						{children}
					</section>
				</main>
				<footer className="container mx-auto p-8 text-center text-sm text-gray-500">
					<p className="text-center text-sm">&copy; 2024 Ferniture Store</p>
				</footer>
			</body>
		</html>
	);
}
