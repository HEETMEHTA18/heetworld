import { redirect } from "next/navigation";

export const metadata = {
  title: "Stack → Skills",
  robots: { index: false },
};

export default function StackPage() {
  redirect("/skills");
}