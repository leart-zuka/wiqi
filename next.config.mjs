import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// CHANGED: Added path to request.ts for better 404 handling
// BEFORE: createNextIntlPlugin() (used default ./src/i18n.ts)
// AFTER: createNextIntlPlugin("./src/i18n/request.ts") (uses new location)
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

const combinedConfig = withNextIntl(withMDX(nextConfig));
export default combinedConfig;
