/**
 * POST /api/billing/webhook
 *
 * Stripe webhook handler.  Stripe sends signed events here after payment
 * lifecycle changes.  We verify the signature, then update Firestore.
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY      — sk_live_... or sk_test_...
 *   STRIPE_WEBHOOK_SECRET  — whsec_... (from Stripe Dashboard → Webhooks)
 *
 * Register this endpoint in the Stripe Dashboard (or CLI):
 *   stripe listen --forward-to localhost:3000/api/billing/webhook
 *
 * Events handled:
 *   checkout.session.completed   → mark user premium, store stripeCustomerId
 *   customer.subscription.deleted → revoke premium access
 *   invoice.payment_failed       → (optional) send a follow-up email
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
});

// Next.js must NOT parse the body — Stripe needs the raw bytes to verify HMAC
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, sig, secret);
    } catch (err) {
        console.error("[webhook] Signature verification failed:", err);
        return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
    }

    const db = adminDb();

    switch (event.type) {
        // ── Payment succeeded: grant premium ──────────────────────────────────
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const uid = session.metadata?.firebaseUid;
            const customerId = session.customer as string;

            if (!uid) {
                console.warn("[webhook] checkout.session.completed: no firebaseUid in metadata");
                break;
            }

            await db.doc(`users/${uid}`).set(
                {
                    isPremium: true,
                    stripeCustomerId: customerId,
                    premiumSince: new Date().toISOString(),
                },
                { merge: true }
            );
            console.log(`[webhook] Granted premium to user ${uid} (customer ${customerId})`);
            break;
        }

        // ── Subscription cancelled / expired: revoke premium ──────────────────
        case "customer.subscription.deleted": {
            const sub = event.data.object as Stripe.Subscription;
            const uid = sub.metadata?.firebaseUid;

            if (!uid) {
                // Fall back: look up by stripeCustomerId
                const snap = await db
                    .collection("users")
                    .where("stripeCustomerId", "==", sub.customer as string)
                    .limit(1)
                    .get();

                if (!snap.empty) {
                    await snap.docs[0].ref.set(
                        { isPremium: false, premiumRevokedAt: new Date().toISOString() },
                        { merge: true }
                    );
                }
                break;
            }

            await db.doc(`users/${uid}`).set(
                { isPremium: false, premiumRevokedAt: new Date().toISOString() },
                { merge: true }
            );
            console.log(`[webhook] Revoked premium for user ${uid}`);
            break;
        }

        // ── Payment failed: log for visibility ────────────────────────────────
        case "invoice.payment_failed": {
            const invoice = event.data.object as Stripe.Invoice;
            console.warn(`[webhook] Payment failed for customer ${invoice.customer}`);
            // TODO: trigger an email via SendGrid / Resend / Postmark
            break;
        }

        default:
            // Unhandled event type — safe to ignore
            break;
    }

    return NextResponse.json({ received: true });
}
