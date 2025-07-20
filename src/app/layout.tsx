import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "WiQi",
  description: "From humans, for humans",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WiQi</title>
      </head>
      <body className="flex min-h-screen flex-col bg-gray-50 text-black dark:bg-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
