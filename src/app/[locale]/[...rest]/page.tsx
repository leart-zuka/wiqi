import { notFound } from "next/navigation";

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    Catch-All Route for Unknown Localized Paths               ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * This file is located at `src/app/[locale]/[...rest]/page.tsx` and serves as a
 * catch-all route for unknown paths within localized segments.
 *
 * Why this specific path is needed:
 * - The `[locale]` segment ensures this only catches routes that have a valid
 *   locale prefix
 * - The `[...rest]` segment catches any number of additional path segments
 *   that don't match existing routes
 * - When an unknown route is accessed (like `/en/nonexistent-page`), this
 *   component calls `notFound()` which triggers the localized 404 page
 *   at `src/app/[locale]/not-found.tsx`
 *
 * Without this file, unknown routes within locale segments would show a generic
 * Next.js 404 instead of our custom localized 404 page.
 */

export default function CatchAllPage() {
  notFound();
}
