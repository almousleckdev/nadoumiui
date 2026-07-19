import type { Metadata } from "next";
import PartnersPageClient from "./PartnersPageClient";

export const metadata: Metadata = {
  title: "Our Partners | Nadoumi",
  description:
    "We collaborate with top universities and leading organizations to provide the best opportunities for our students.",
};

export default function PartnersPage() {
  return <PartnersPageClient />;
}
