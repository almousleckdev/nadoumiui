import Image from "next/image";
import type { University } from "@/types";
import { BuildingOfficeIcon, PhotoIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function CampusTab({ university, albumImages }: { university: University; albumImages: string[] }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <BuildingOfficeIcon className="w-7 h-7 text-indigo-600" />
          Campus Facilities
        </h2>
        {university.campusFacilities && university.campusFacilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {university.campusFacilities.map((facility, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <span className="font-semibold text-gray-700 leading-tight">{facility}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No facility details provided.</p>
        )}
      </section>

      <section className="pt-4 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <PhotoIcon className="w-7 h-7 text-pink-600" />
          Life at {university.name}
        </h2>
        {albumImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {albumImages.map((src, idx) => (
              <div key={idx} className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm group">
                <Image
                  src={src}
                  alt={`Campus Life ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic p-6 bg-gray-50 rounded-2xl text-center border border-gray-100">
            No photos available.
          </p>
        )}
      </section>
    </div>
  );
}
