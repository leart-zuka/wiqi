// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import "katex/dist/katex.min.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMessages } from "next-intl/server";
import { CookiesProvider } from "next-client-cookies/server";
import EasterEgg from "../components/EasterEgg";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "WiQi",
  description: "From humans, for humans",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "en" | "de" };
}) {
  const messages = await getMessages();
  // Inline script to set the dark mode class on <html> before hydration
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang={locale}>
      <head>
        {/* Preload theme to prevent FOIT */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta charSet="utf-8" />
        <meta property="og:title" content="WiQi" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/logos/wiqi/wq.png`}
        />
        <meta
          property="og:description"
          content="Teaching the world about the world of quanta. By Humans for Humans"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WiQi</title>
      </head>
      <body className="flex min-h-screen flex-col overflow-x-clip bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-100">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <EasterEgg />
          <div className="flex-grow bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-100">
            <CookiesProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </CookiesProvider>
          </div>
          <Footer params={{ locale }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
