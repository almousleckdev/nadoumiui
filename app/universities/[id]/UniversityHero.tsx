import React from "react";
import Image from "next/image";
import type { University } from "@/types";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  AcademicCapIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export function UniversityHero({
  university,
  onApplyClick,
}: {
  university: University;
  onApplyClick?: () => void;
}) {
  return (
    <div className="relative min-h-[480px] w-full bg-slate-950 text-white flex flex-col justify-end overflow-hidden">
      {/* Background Banner Image with Dark Gradient Glass Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            university.bannerImage ??
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"
          }
          alt={university.name}
          fill
          priority
          className="object-cover opacity-35 filter brightness-90 saturate-110 scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 pt-28">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {university.logo ? (
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white/95 backdrop-blur-xl rounded-3xl p-3 shadow-2xl flex-shrink-0 relative overflow-hidden ring-4 ring-white/10 flex items-center justify-center">
                <Image
                  src={university.logo}
                  alt={`${university.name} Logo`}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl ring-4 ring-white/10 flex items-center justify-center font-bold text-3xl text-orange-400">
                {university.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {university.isTop && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <SparklesIcon className="w-3.5 h-3.5" />
                    Top Ranked University
                  </span>
                )}
                {university.isPartner && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600/90 backdrop-blur-md text-white border border-blue-400/30">
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-blue-200" />
                    Verified Institution Partner
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-slate-200 border border-white/15">
                  {university.type} Institution
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
                  {university.name}
                </h1>
                {university.nameInChinese && (
                  <p className="text-xl sm:text-2xl font-medium text-slate-300 mt-1 font-chinese">
                    {university.nameInChinese}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-100 font-semibold pt-1">
                <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-xs">
                  <MapPinIcon className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-white">
                    {university.city || "China"}, {university.province}
                  </span>
                </div>
                {university.foundedYear && (
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-xs">
                    <BuildingOfficeIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-white">Est. {university.foundedYear}</span>
                  </div>
                )}
                {university.qsRank && (
                  <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 shadow-xs">
                    <AcademicCapIcon className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="text-white">QS Rank #{university.qsRank}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityHero;
