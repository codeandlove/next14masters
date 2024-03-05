/** @type {import('next').NextConfig} */
import WithMDX from "@next/mdx";

const nextConfig = {
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	staticPageGenerationTimeout: 1200,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "**",
			},
		],
	},
	env: {
		GRAPHQL_URL: process.env.GRAPHQL_URL,
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
				permanent: false,
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
				permanent: false,
			},
		];
	},
};

const withMDX = WithMDX();

export default withMDX(nextConfig);
