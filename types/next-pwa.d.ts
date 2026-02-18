/**
 * This file previously contained custom type declarations for `next-pwa@5`.
 *
 * The project has been migrated to `@ducanh2912/next-pwa`, which ships its
 * own TypeScript types — no manual declaration is needed here.
 *
 * TODO: Once PNG icons are generated at 192×192 and 512×512, update
 * public/manifest.json to include them as separate entries:
 *
 *   { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
 *   { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
 *
 * You can generate PNG icons from the existing SVG with:
 *   npx @squoosh/cli --resize '{"enabled":true,"width":192}' -d public/icons public/icons/icon-512x512.svg
 * or any SVG-to-PNG converter.
 */
export { };
