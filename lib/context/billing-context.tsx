"use client";

/**
 * BillingContext — manages premium subscription state.
 *
 * Source of truth: Firestore /users/{uid}.isPremium
 *   • Written server-side by the Stripe webhook (never by the client).
 *   • Read client-side via Firestore onSnapshot for real-time updates.
 *
 * NOTE: localStorage is intentionally NOT used for isPremium.
 * Client-side storage can be tampered with; all entitlement checks
 * must be backed by Firestore (server-authoritative).
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface BillingContextType {
    isPremium: boolean;
    isLoading: boolean;
    /** Stripe customer ID — needed for the portal redirect. */
    stripeCustomerId: string | null;
    upgradeToPremium: () => Promise<void>;
    manageSubscription: () => Promise<void>;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export function BillingProvider({ children }: { children: React.ReactNode }) {
    const [isPremium, setIsPremium] = useState(false);
    const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Step 1: Wait for Firebase Auth to resolve
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setIsPremium(false);
                setStripeCustomerId(null);
                setIsLoading(false);
                return;
            }

            // Step 2: Subscribe to the user's Firestore document for live updates.
            // Stripe webhook sets isPremium=true; this listener picks it up immediately.
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribeSnapshot = onSnapshot(
                userDocRef,
                (snap) => {
                    if (snap.exists()) {
                        const data = snap.data();
                        setIsPremium(data.isPremium === true);
                        setStripeCustomerId(data.stripeCustomerId ?? null);
                    } else {
                        setIsPremium(false);
                        setStripeCustomerId(null);
                    }
                    setIsLoading(false);
                },
                (err) => {
                    console.error("[BillingContext] Firestore snapshot error:", err);
                    setIsLoading(false);
                }
            );

            // Clean up the snapshot listener when the auth state changes
            return unsubscribeSnapshot;
        });

        return unsubscribeAuth;
    }, []);

    /**
     * Redirect to Stripe Checkout.
     * On success, Stripe webhook sets isPremium=true in Firestore, and the
     * onSnapshot listener above will update the UI automatically.
     *
     * TODO: The API route at /api/billing/checkout should verify the user's
     * identity server-side (e.g., via Firebase Admin SDK token verification)
     * instead of trusting the client-sent userId.
     */
    const upgradeToPremium = async () => {
        const user = auth.currentUser;
        if (!user) {
            console.warn("[BillingContext] upgradeToPremium called without a logged-in user.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/billing/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.uid,
                    email: user.email ?? "",
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error ?? "Checkout request failed");
            }

            const { url } = await res.json() as { url: string };
            window.location.href = url;
        } catch (err) {
            console.error("[BillingContext] upgradeToPremium error:", err);
            setIsLoading(false);
        }
        // Do NOT setIsLoading(false) on success — the page is navigating away
    };

    /**
     * Redirect to Stripe Billing Portal for subscription management.
     * Requires stripeCustomerId (available after first successful checkout).
     */
    const manageSubscription = async () => {
        if (!stripeCustomerId) {
            console.warn("[BillingContext] manageSubscription: no stripeCustomerId on record.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/billing/portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customerId: stripeCustomerId }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error ?? "Portal request failed");
            }

            const { url } = await res.json() as { url: string };
            window.location.href = url;
        } catch (err) {
            console.error("[BillingContext] manageSubscription error:", err);
            setIsLoading(false);
        }
    };

    return (
        <BillingContext.Provider
            value={{ isPremium, isLoading, stripeCustomerId, upgradeToPremium, manageSubscription }}
        >
            {children}
        </BillingContext.Provider>
    );
}

export const useBilling = () => {
    const context = useContext(BillingContext);
    if (!context) {
        throw new Error('useBilling must be used within a BillingProvider');
    }
    return context;
};
