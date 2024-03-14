import { type NextRequest } from "next/server";
import { getProductsAll } from "@/api/graphql";
import { runPineconeProductsIndex } from "@/api/ai";
import { type ProductItemFragment } from "@/gql/graphql";

export async function GET(_request: NextRequest): Promise<Response> {
	const products = (await getProductsAll()) as ProductItemFragment[];

	const data = products.map((product) => ({
		id: product.id,
		description: product.longDescription,
	}));

	await runPineconeProductsIndex(data);

	return new Response(JSON.stringify("Indexed products in pinecone"), {
		headers: { "content-type": "text/plain" },
		status: 200,
	});
}
