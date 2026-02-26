/**
 * Lightweight server-safe HTML sanitizer.
 *
 * Strips the most dangerous XSS vectors: <script>, <iframe>, inline event
 * handlers (on*), and javascript: URIs. Applied to any HTML rendered with
 * dangerouslySetInnerHTML so future data-source changes don't introduce XSS.
 *
 * ⚠️ TODO: Regex-based sanitizers are inherently fragile and can be bypassed.
 * If any content flowing through this function could originate from user input
 * or untrusted external APIs, upgrade to `isomorphic-dompurify` which uses a
 * proper DOM parser. Current usage is safe because all data is static/curated.
 */
export function sanitizeHtml(html: string): string {
    return html
        // Remove <script> tags and their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove <iframe> tags and their content
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        // Remove <object> and <embed> elements
        .replace(/<(object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        // Strip inline event handlers: onclick="...", onload='...', etc.
        .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
        // Remove javascript: href / src values
        .replace(/(href|src)\s*=\s*"javascript:[^"]*"/gi, 'href="#"')
        .replace(/(href|src)\s*=\s*'javascript:[^']*'/gi, "href='#'");
}
