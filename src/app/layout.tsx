import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PageNavigation } from "@/ui/molecules/PageNavigation";
import { type ActiveLinkItemType } from "@/ui/types";
import { getCategories } from "@/api/graphql";
import { PageSearchBar } from "@/ui/atoms/PageSearchBar";
import { CartIcon } from "@/ui/atoms/CartIcon";
import { Logo } from "@/ui/atoms/logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Super Store",
	description: "Super Store - The best super store in the world!",
};

const primaryPageLinks: ActiveLinkItemType[] = [
	{ name: "Home Page", url: "/", exact: true },
	{ name: "All", url: "/products" },
];

export default async function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal?: React.ReactNode;
}>) {
	const storeCategories = await getCategories({ pageNumber: "1" });
	const pageLinks = [...primaryPageLinks];

	if (storeCategories.length) {
		const categoryLinks = storeCategories.map((category) => ({
			name: category.name,
			url: `/categories/${category.slug}`,
		}));
		pageLinks.push(...categoryLinks);
	}

	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<header className="pb-24">
						<div className="top:0 fixed inset-x-0 top-0 z-10 flex h-24 items-center bg-white shadow-2xl shadow-black/10">
							<div className="container mx-auto flex items-center justify-between">
								<div className="order-2 lg:order-1">
									<Logo />
								</div>
								<div className="order-1 lg:order-2">
									<PageNavigation links={pageLinks} />
								</div>
								<div className="order-3 flex items-center space-x-4 lg:order-3 lg:ml-auto lg:space-x-8">
									<PageSearchBar />
								</div>
								<div className="mx- order-4 whitespace-nowrap">
									<SignedIn>
										<UserButton userProfileMode="navigation" userProfileUrl="/user-profile" />
									</SignedIn>
									<SignedOut>
										<SignInButton />
									</SignedOut>
								</div>
								<div className="order-5">
									<Suspense>
										<CartIcon />
									</Suspense>
								</div>
							</div>
						</div>
					</header>
					<main className="my-4 px-4">
						<section className="container mx-auto flex min-h-screen flex-col items-center">
							{children}
						</section>
					</main>
					<footer className="container mx-auto p-8 text-center text-sm text-gray-500">
						<p className="text-center text-sm">&copy; 2024 Super Store</p>
					</footer>
					{modal}
				</body>
			</html>
		</ClerkProvider>
	);
}
