import React from "react";

export interface HeroStat {
  value: string;
  label: string;
  sublabel: string;
}

export const SHARED_HERO_STATS: HeroStat[] = [
  {
    value: "5,000+",
    label: "Available Scholarships",
    sublabel: "Direct university allocations",
  },
  {
    value: "150+",
    label: "Partner Universities",
    sublabel: "Across major Chinese provinces",
  },
  {
    value: "98%",
    label: "Visa & Admission Success",
    sublabel: "JW202 & admission clearance rate",
  },
  {
    value: "24h",
    label: "Typical Response Time",
    sublabel: "Dedicated counselor review",
  },
];

interface StatsHeroStripProps {
  className?: string;
}

export function StatsHeroStrip({ className = "" }: StatsHeroStripProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm grid grid-cols-2 lg:grid-cols-4 p-4 sm:p-6">
        {SHARED_HERO_STATS.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 text-center flex flex-col items-center justify-center border-gray-100 ${
              idx % 2 === 1 ? "border-l" : ""
            } ${idx >= 2 ? "border-t lg:border-t-0" : ""} ${idx >= 1 ? "lg:border-l" : ""}`}
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight font-heading mb-1">
              {stat.value}
            </span>
            <span className="text-sm font-bold text-gray-800 mb-0.5">{stat.label}</span>
            <span className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{stat.sublabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsHeroStrip;
