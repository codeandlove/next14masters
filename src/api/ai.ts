/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pinecone } from "@pinecone-database/pinecone";
import { Document, type Document as DocumentType } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

export const runPineconeProductsIndex = async (
	data: Array<{ id: string; description: string }>,
) => {
	const pinecone = new Pinecone();

	const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

	if (data) {
		const docs: DocumentType[] = [];

		data.forEach((item) => {
			docs.push(
				new Document({
					metadata: { id: item.id },
					pageContent: item.description,
				}),
			);
		});

		await pinecone.Index(process.env.PINECONE_INDEX!).deleteAll();

		await PineconeStore.fromDocuments(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			docs,
			new OpenAIEmbeddings({
				openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
				batchSize: 512, // Default value if omitted is 512. Max is 2048
				modelName: "text-embedding-ada-002",
			}),
			{
				pineconeIndex,
				maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
			},
		).then(() => {
			console.log("All embendings indexed successfully");
		});
	}
};

export const getPincoreFindings = async (query: string) => {
	if (query) {
		const pinecone = new Pinecone();

		const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

		const vectorStore = await PineconeStore.fromExistingIndex(new OpenAIEmbeddings(), {
			pineconeIndex,
		});

		/* Search the vector DB independently with metadata filters */
		const results = await vectorStore.similaritySearch(query, 4);

		return results;
	}
};

export type aiProductsResponse = {
	data: Array<string>;
};

export const getAiProductsRelated = async (description: string) => {
	const res = await fetch(`${process.env.APP_URL}/api/webhook/productsAi`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			description: description,
		}),
	});

	return (await res.json()) as aiProductsResponse;
};
