import Image from "next/image";
import type { University } from "@/types";
import Badge from "@/components/ui/Badge";
import { BuildingOfficeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export function UniversityHero({ university }: { university: University }) {
  return (
    <div className="relative h-[450px] w-full bg-slate-900 flex flex-col justify-end">
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        <Image
          src={university.bannerImage ?? "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"}
          alt="University Campus"
          fill
          priority
          className="object-cover opacity-40 mix-blend-overlay"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          {university.logo && (
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl p-3 shadow-2xl flex-shrink-0 relative overflow-hidden border-4 border-white/10">
              <Image src={university.logo} alt="Logo" fill className="object-contain p-3" sizes="(max-width: 768px) 128px, 160px" />
            </div>
          )}
          <div className="flex-1 text-white">
            <div className="flex flex-wrap gap-3 mb-4">
              {university.isTop && (
                <Badge className="bg-orange-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-orange-500/30">
                  Top Ranked
                </Badge>
              )}
              {university.isPartner && (
                <Badge className="bg-blue-600 text-white font-bold border-none px-3 py-1 shadow-lg shadow-blue-600/30">
                  Official Partner
                </Badge>
              )}
              <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 font-medium px-3 py-1">
                {university.type}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 text-white drop-shadow-sm">
              {university.name}
            </h1>
            {university.nameInChinese && (
              <p className="text-2xl font-medium text-slate-300 mb-6 drop-shadow-sm">{university.nameInChinese}</p>
            )}
            <div className="flex flex-wrap items-center gap-6 text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-orange-400" />
                <span>
                  {university.city}, {university.province}
                </span>
              </div>
              {university.foundedYear && (
                <div className="flex items-center gap-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
                  <span>Est. {university.foundedYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
