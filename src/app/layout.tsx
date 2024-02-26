import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageNavigation } from "@/ui/molecules/PageNavigation";
import { type ActiveLinkItemType } from "@/ui/types";
import { type CategoryItemFragment } from "@/gql/graphql";
import { getCategories } from "@/api/graphql";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ferniture Store",
	description: "Ferniture Store - The best furniture store in the world!",
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
	const storeCategories = (await getCategories({ pageNumber: "1" })) as CategoryItemFragment[];

	const pageLinks = [...primaryPageLinks];

	if (storeCategories.length) {
		const categoryLinks = storeCategories.map((category) => ({
			name: category.name,
			url: `/category/${category.slug}`,
		}));
		pageLinks.push(...categoryLinks);
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				<header>
					<PageNavigation links={pageLinks} />
				</header>
				<main className="my-10 px-4">
					<section className="container mx-auto flex min-h-screen flex-col items-center justify-between">
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
