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
 */

import admin from "firebase-admin";
import type { App } from "firebase-admin/app";

let app: App;

function getAdminApp(): App {
    if (!app) {
        // Guard: only initialise once across hot-reloads in development
        if (admin.apps.length === 0) {
            const privateKeyB64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
            if (!privateKeyB64) {
                throw new Error(
                    "[firebase-admin] FIREBASE_ADMIN_PRIVATE_KEY is not set. " +
                    "See lib/firebase-admin.ts for setup instructions."
                );
            }

            app = admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    // Vercel stores env vars as base-64 to avoid newline issues
                    privateKey: Buffer.from(privateKeyB64, "base64").toString("utf8"),
                }),
            });
        } else {
            app = admin.apps[0]!;
        }
    }
    return app;
}

/** Server-side Firestore instance. */
export const adminDb = (): admin.firestore.Firestore => getAdminApp().firestore();
