import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border text-[12px] font-medium leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        outline: "border-border bg-transparent text-muted-foreground",
        soft: "border-transparent bg-muted text-muted-foreground",
        accent: "border-transparent bg-accent-soft text-accent",
      },
      size: {
        sm: "px-2.5 py-1",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export function Pill({ className, variant, size, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ variant, size }), className)} {...props} />
  );
}

export function Tag({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}