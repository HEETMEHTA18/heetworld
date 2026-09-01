import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-sm hover:bg-accent-hover hover:-translate-y-px hover:shadow-md active:translate-y-0",
        secondary:
          "border border-border bg-card text-foreground shadow-sm hover:-translate-y-px hover:border-foreground/20 hover:shadow-md active:translate-y-0",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px]",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  external?: boolean;
}

function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: ButtonLinkProps) {
  const Comp = external ? "a" : Link;
  return (
    <Comp
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export { Button, ButtonLink, buttonVariants };