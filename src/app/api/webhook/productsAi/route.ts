import { NextResponse, type NextRequest } from "next/server";
import { getPincoreFindings } from "@/api/ai";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	if (
		typeof json === "object" &&
		json &&
		"description" in json &&
		typeof json.description === "string"
	) {
		const description = json.description;

		const aiFindings = (await getPincoreFindings(description)) as
			| { metadata: { id: string } }[]
			| undefined;

		if (aiFindings) {
			return NextResponse.json(
				{ data: aiFindings.map((item) => item.metadata.id) },
				{ status: 201 },
			);
		}

		return NextResponse.json({ message: "No products found" }, { status: 201 });
	}

	return NextResponse.json({ message: `Invalid body` }, { status: 400 });
}
