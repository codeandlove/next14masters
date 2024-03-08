/// <reference types="stripe-event-types" />
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe secret key not found");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Stripe webhook secret key not found");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");

	if (!signature) {
		return NextResponse.json({ message: "No signature" }, { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object;
			console.log(`Checkout session completed: ${session.id}`);
			break;
		}
		case "payment_intent.succeeded": {
			const paymentIntent = event.data.object;
			console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
			break;
		}
		default: {
			console.log(`Unhandled event type: ${event.type}`);
			break;
		}
	}

	return new Response("OK", { status: 200 });
}
