import Image from "next/image";
import type { Scholarship } from "@/types";
import Badge from "@/components/ui/Badge";
import { ClockIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

export function ScholarshipHero({ scholarship, deadlineStr }: { scholarship: Scholarship; deadlineStr: string }) {
  return (
    <div className="relative h-[450px] w-full bg-blue-950 flex flex-col justify-end">
      <div className="absolute inset-0 bg-blue-950 overflow-hidden">
        <Image
          src={scholarship.coverImage ?? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920"}
          alt="Scholarship Banner"
          fill
          priority
          className="object-cover opacity-30 mix-blend-overlay"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row gap-8 items-end justify-between">
          <div className="flex-1 text-white">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-orange-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-orange-500/30">
                {scholarship.scholarshipCategory.replace("_", " ")}
              </Badge>
              {scholarship.isTop && (
                <Badge className="bg-blue-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-blue-500/30">
                  Top Pick
                </Badge>
              )}
              {scholarship.isHot && (
                <Badge className="bg-red-500 text-white font-bold border-none px-3 py-1 shadow-lg shadow-red-500/30">
                  High Demand
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 text-white drop-shadow-sm max-w-4xl leading-tight">
              {scholarship.title}
            </h1>

            {scholarship.titleInChinese && (
              <p className="text-2xl font-medium text-blue-200 mb-6 drop-shadow-sm">{scholarship.titleInChinese}</p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-blue-100 font-medium">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-orange-400" />
                <span>
                  Deadline: <strong className="text-white">{deadlineStr}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-green-400" />
                <span>
                  Levels: <strong className="text-white">{scholarship.programCategories.join(", ")}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
