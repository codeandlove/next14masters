/** @type {import('next').NextConfig} */
import WithMDX from "@next/mdx";

const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/search",
				destination: "/search/1",
				permanent: false,
			},
			{
				source: "/category/:slug",
				destination: "/category/:slug/1",
				permanent: false,
			},
		];
	},
};

const withMDX = WithMDX();

export default withMDX(nextConfig);
