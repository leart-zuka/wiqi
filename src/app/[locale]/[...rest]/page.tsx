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
 *
 * IMPORTANT: This catch-all route is NOT sufficient for all 404 cases!
 *
 * Why we need additional validation in specific routes:
 * - Next.js route matching follows priority: static > dynamic > catch-all
 * - For `/en/posts/invalid-folder`, the more specific `[locale]/posts/[subfolder]/page.tsx`
 *   route matches FIRST, so this catch-all never gets reached
 * - The specific route then tries to load content for "invalid-folder" and fails
 * - We need validation in the specific route to check if the subfolder is valid
 *   and redirect to 404 if not, rather than showing empty/broken content
 * - This ensures proper 404 handling for invalid subfolders within valid route structures
 *
 * How it was fixed:
 * - Added `isValidSubfolder()` function in `[locale]/posts/[subfolder]/page.tsx` to validate
 *   subfolder names against allowed values: ["entries", "quantum_tuesdays"]
 * - Enhanced `getFiles()` function to check validity and set `shouldRedirect` state
 * - Added `useEffect` hook to redirect to `/${locale}/not-found` when invalid
 * - Added loading state during redirect to prevent content flash
 * - Improved API route error handling to gracefully return empty arrays for invalid paths
 * - This ensures invalid subfolders like `/en/posts/invalid-folder` properly redirect to 404
 *   instead of showing broken/empty content or causing runtime errors
 *
 * Why we need both client validation AND API validation:
 * - Client validation: Immediate 404 redirect (better UX, no unnecessary API calls)
 * - API validation: Backend safety net (prevents crashes, handles edge cases)
 * - This catch-all route: Handles truly unknown paths outside existing route structures
 * - All three work together for comprehensive 404 handling across different scenarios
 */

export default function CatchAllPage() {
  notFound();
}
