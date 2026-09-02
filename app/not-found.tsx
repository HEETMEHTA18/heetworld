import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { NotFoundClient } from "@/components/not-found-client";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return <NotFoundClient />;
}
