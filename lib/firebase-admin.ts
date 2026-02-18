/**
 * Firebase Admin SDK — server-side only.
 *
 * Used by Next.js API routes that need to write to Firestore with
 * elevated privileges (e.g., the Stripe webhook handler).
 *
 * Required environment variables (add to .env.local + Vercel project):
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY   (base-64 encoded PEM — see README)
 *
 * To obtain a service account JSON:
 *   Firebase Console → Project Settings → Service Accounts → Generate new private key
 *
 * Then encode the private key:
 *   node -e "console.log(Buffer.from(process.env.FIREBASE_PRIVATE_KEY).toString('base64'))"
 *
 * firebase-admin v13+ uses the modular API — app.firestore() is removed.
 * Use getFirestore(app) from 'firebase-admin/firestore' instead.
 */

import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import type { App } from "firebase-admin/app";

function getAdminApp(): App {
    if (getApps().length > 0) {
        return getApp();
    }

    const privateKeyB64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (!privateKeyB64) {
        throw new Error(
            "[firebase-admin] FIREBASE_ADMIN_PRIVATE_KEY is not set. " +
            "See lib/firebase-admin.ts for setup instructions."
        );
    }

    return initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            // Vercel stores env vars as base-64 to avoid newline issues
            privateKey: Buffer.from(privateKeyB64, "base64").toString("utf8"),
        }),
    });
}

/** Server-side Firestore instance (firebase-admin v13 modular API). */
export const adminDb = (): Firestore => getFirestore(getAdminApp());
