import type { Metadata } from "next";
import GuideLayout from "../components/GuideLayout";
import CityImage from "./CityImage";

import { cityGuides as cities } from "@/data/guides";

export const metadata: Metadata = {
  title: "City Guides | Nadoumi",
  description:
    "From the bustling streets of Shanghai to the spicy, relaxed vibes of Chengdu. Find the perfect city for your studies.",
};

export default function CityGuidesPage() {
  return (
    <GuideLayout
      title="City Guides"
      subtitle="From the bustling streets of Shanghai to the spicy, relaxed vibes of Chengdu. Find the perfect city for your studies."
      image="/images/hero-group.png"
    >
      <div className="space-y-16">
        {/* ── MAJOR CITIES ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cities.map((city, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="relative h-64 w-full bg-gray-100">
                <CityImage src={city.image} alt={city.name} />
              </div>
              <div className="p-8 flex-grow">
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">
                  {city.tag}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {city.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {city.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CITY TIERS ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding City Tiers</h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-4xl">
            Chinese cities are unofficially categorized into &quot;Tiers&quot; based on population, GDP, and political administration.
            Your choice of city tier will heavily influence your living costs, cultural immersion, and career opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tier 1</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">The Megacities</p>
              <p className="text-gray-600 leading-relaxed">Beijing, Shanghai, Guangzhou, Shenzhen. International hubs, highest living costs, excellent career opportunities.</p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Tier 1</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Rising Stars</p>
              <p className="text-gray-600 leading-relaxed">Chengdu, Hangzhou, Wuhan, Xi&apos;an. Rapid development, excellent universities, very livable.</p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tier 2 & 3</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Authentic China</p>
              <p className="text-gray-600 leading-relaxed">Kunming, Xiamen, Harbin. Low cost of living, perfect for language immersion and traditional culture.</p>
            </div>
          </div>
        </div>
      </div>
    </GuideLayout>
  );
}
