import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Turblopack-compatible: plugins referenced by name with plain options.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap", wrapProps: { className: "heading-anchor" } }],
      ["rehype-pretty-code", { theme: "github-dark-dimmed", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
