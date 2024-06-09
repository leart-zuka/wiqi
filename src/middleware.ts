import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de"],
  defaultLocale: "de",
});

export const config = {
  matcher: ["/", "/(de|en)/:path*"],
};
