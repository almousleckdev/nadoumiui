import type { Metadata } from "next";
import CityGuidesClient from "./CityGuidesClient";

export const metadata: Metadata = {
  title: "City Guides | Nadoumi",
  description:
    "From the bustling streets of Shanghai to the spicy, relaxed vibes of Chengdu. Explore China's major study destinations, province by province.",
};

export default function CityGuidesPage() {
  return <CityGuidesClient />;
}
