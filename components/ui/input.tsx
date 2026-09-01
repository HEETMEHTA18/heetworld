import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      ) : null}
      <input
        className={cn(
          "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      ) : null}
      <textarea
        className={cn(
          "w-full resize-y rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
Textarea.displayName = "Textarea";