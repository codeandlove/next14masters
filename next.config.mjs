/** @type {import('next').NextConfig} */
import WithMDX from "@next/mdx";

const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
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
