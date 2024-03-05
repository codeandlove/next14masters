import { type NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<Response> {
	return NextResponse.json("Hello world!");

	// return new Response(JSON.stringify("Hello world!"), {
	// 	headers: { "content-type": "text/plain" },
	// 	status: 200,
	// });
}
