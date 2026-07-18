import Image from "next/image";
import type { University } from "@/types";
import { StarIcon, AcademicCapIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function OverviewTab({ university, overviewImage }: { university: University; overviewImage: string }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About {university.name}</h2>
        <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed mb-8">
          <p>{university.introduction || university.description || "No detailed description available."}</p>
        </div>

        <div className="relative w-full h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-md group">
          <Image
            src={overviewImage}
            alt="Campus View"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-bold text-lg drop-shadow-sm">Discover your future at {university.name}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {university.highlights && university.highlights.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <StarIcon className="w-5 h-5 text-orange-500" /> Key Highlights
            </h3>
            <ul className="space-y-3">
              {university.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {university.advantages && university.advantages.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
              <AcademicCapIcon className="w-5 h-5 text-blue-600" /> Advantages
            </h3>
            <ul className="space-y-3">
              {university.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
