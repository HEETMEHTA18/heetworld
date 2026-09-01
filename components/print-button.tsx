"use client";

import { Printer } from "lucide-react";

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center gap-2 ${className || ""}`}
    >
      <Printer className="h-4 w-4" />
      <span>Print / Save PDF</span>
    </button>
  );
}
