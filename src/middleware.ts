import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "de",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};
