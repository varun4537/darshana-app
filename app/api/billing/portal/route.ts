/**
 * POST /api/billing/portal
 *
 * Creates a Stripe Billing Portal session so subscribers can manage
 * their subscription (cancel, update payment method, view invoices).
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY   — sk_live_... or sk_test_...
 *   NEXT_PUBLIC_APP_URL — https://yourdomain.com (no trailing slash)
 *
 * The caller must send { customerId } in the request body.
 * The Stripe customer ID is stored in Firestore after the first checkout.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Prevent Next.js from statically evaluating this route at build time.
// STRIPE_SECRET_KEY is only available at runtime (Vercel env vars).
export const dynamic = "force-dynamic";

function getStripe(): Stripe {
    return new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-01-28.clover",
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { customerId: string };
        const { customerId } = body;

        if (!customerId) {
            return NextResponse.json(
                { error: "customerId is required." },
                { status: 400 }
            );
        }

        const stripe = getStripe();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${appUrl}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("[/api/billing/portal]", err);
        return NextResponse.json(
            { error: "Failed to create billing portal session." },
            { status: 500 }
        );
    }
}
