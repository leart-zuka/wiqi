import type { Metadata } from "next";
import "../globals.css";
import "katex/dist/katex.min.css";
import { NextIntlClientProvider } from "next-intl";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Wiqi",
  description: "From humans, for humans",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="title" property="og:title" content="wiqi" />
        <meta name="image" property="og:image" content="public/wq.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>wiqi</title>
      </head>
      <body className="flex h-screen flex-col overflow-x-clip text-black">
        <Header locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <div className="flex-grow">{children}</div>
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
