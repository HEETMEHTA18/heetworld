import { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Heet Mehta — AI engineer, ML engineer, and builder.",
  openGraph: {
    title: "Contact — Heet Mehta",
    description: "Get in touch with Heet Mehta — AI engineer and builder.",
    url: `${site.url}/contact`,
  },
};
