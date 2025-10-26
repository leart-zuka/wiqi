/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    Next.js Internationalization Routing Configuration         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * WHY: Centralizes i18n routing config, enables proper 404 handling, follows modern patterns.
 *      Replaces inline configuration in middleware.ts.
 *
 * BEFORE: Configuration was inline in middleware.ts with direct object:
 *         `createMiddleware({ locales: ["en", "de"], defaultLocale: "de" })`
 *
 * HOW: Imported by middleware.ts to configure route handling, provides TypeScript types,
 *      used by next-intl for locale detection and routing behavior.
 *
 * MAINTAIN: Add new locales to `locales` array, update `defaultLocale` if needed,
 *           add new routes to `pathnames` object when creating pages.
 */

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "en",

  // The `pathnames` object maps pathnames to localized versions
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      de: "/about",
    },
    "/posts": {
      en: "/posts",
      de: "/posts",
    },
    "/quantum-map": {
      en: "/quantum-map",
      de: "/quantum-map",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
