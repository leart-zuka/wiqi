// app/[locale]/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import "katex/dist/katex.min.css";
import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getMessages } from "next-intl/server";
import EasterEgg from "../components/EasterEgg";

export const metadata: Metadata = {
  title: "Wiqi",
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
        <meta name="title" property="og:title" content="wiqi" />
        <meta name="image" property="og:image" content="/wq.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WiQi</title>
      </head>
      <body className="flex h-screen flex-col overflow-x-clip text-black dark:text-base-content">
        <Header locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <EasterEgg />
          <div className="flex-grow">{children}</div>
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
