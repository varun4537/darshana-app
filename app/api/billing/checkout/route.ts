/**
 * POST /api/billing/checkout
 *
 * Creates a Stripe Checkout Session and returns the redirect URL.
 * The client redirects the user to `url`.
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY    — sk_live_... or sk_test_...
 *   STRIPE_PRICE_ID      — price_... (your monthly/annual plan price)
 *   NEXT_PUBLIC_APP_URL  — https://yourdomain.com (no trailing slash)
 *
 * The caller must be authenticated; we embed the Firebase UID in the
 * Stripe session metadata so the webhook can locate the Firestore document.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
    try {
        // The client sends { userId, email } in the request body.
        const body = await req.json() as { userId: string; email: string };
        const { userId, email } = body;

        if (!userId || !email) {
            return NextResponse.json(
                { error: "userId and email are required." },
                { status: 400 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID!,
                    quantity: 1,
                },
            ],
            customer_email: email,
            // Embed Firebase UID so the webhook handler can update Firestore
            metadata: { firebaseUid: userId },
            subscription_data: {
                metadata: { firebaseUid: userId },
            },
            success_url: `${appUrl}/dashboard?upgraded=true`,
            cancel_url: `${appUrl}/dashboard?upgraded=cancelled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("[/api/billing/checkout]", err);
        return NextResponse.json(
            { error: "Failed to create checkout session." },
            { status: 500 }
        );
    }
}
