import { headers } from "next/headers";

import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/server/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-08-27.basil",
});

export async function POST(request: Request) {
    const body = await request.text();
    const signature = (await headers()).get("stripe-signature") as string;
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    console.log(event.type);

    if(event.type === "checkout.session.completed") {
        const credits = Number(session.metadata?.credits);
        const userId = session.client_reference_id;
        if(!userId || !credits) {
            return NextResponse.json({ error: " Something went wrong" }, { status: 400 });
        }
        await db.user.update({
            where: { id: userId },
            data: { credits: { increment: credits } }
        });
        await db.stripeTransaction.create({
            data: {
                userId: userId,
                credits: credits,
            }
        });
        return NextResponse.json({ message: "Credits added successfully" }, { status: 200 });
    }

    return new Response("Webhook received", { status: 200 });
}