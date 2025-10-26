/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    Next.js Internationalization Middleware                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * CHANGES MADE:
 * - Updated to use centralized routing config from `./i18n/routing.ts`
 * - Updated matcher to handle all routes for better 404 handling
 *
 * WHY: New matcher enables proper 404 pages for both localized (`/en/unknown`)
 * and non-localized (`/unknown.txt`) routes.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
