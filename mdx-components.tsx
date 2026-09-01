import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { Callout, Caption, Stat } from "@/components/mdx/annotations";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return <Link href={href} {...props}>{children}</Link>;
  },
  img: (props) => (
    <Image
      sizes="(min-width: 1024px) 720px, 100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  pre: ({ children }) => (
    <pre
      className="overflow-x-auto rounded-xl border border-border bg-muted px-0 py-0 leading-relaxed [figure&]:mt-0 [figure&]:mb-0"
      style={{ background: "var(--muted)" }}
    >
      {children}
    </pre>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
        {children}
      </code>
    );
  },
  Callout,
  Caption,
  Stat,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
