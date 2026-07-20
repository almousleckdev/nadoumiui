"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { University } from "@/types";
import {
  BuildingOfficeIcon,
  PhotoIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function CampusTab({ university, albumImages }: { university: University; albumImages: string[] }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (activeImageIndex === null || albumImages.length === 0) return;
    setActiveImageIndex((prev) => (prev === null ? 0 : (prev + 1) % albumImages.length));
  }, [activeImageIndex, albumImages.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null || albumImages.length === 0) return;
    setActiveImageIndex((prev) => (prev === null ? 0 : (prev - 1 + albumImages.length) % albumImages.length));
  }, [activeImageIndex, albumImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setActiveImageIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Campus Facilities */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <BuildingOfficeIcon className="w-6 h-6 text-slate-900 shrink-0" />
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight font-heading">
              Campus Facilities & Infrastructure
            </h2>
            <p className="text-xs text-slate-500 font-medium">On-campus accommodation and academic resources</p>
          </div>
        </div>

        {university.campusFacilities && university.campusFacilities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {university.campusFacilities.map((facility, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-200 shadow-2xs">
                <CheckCircleIcon className="w-5 h-5 text-gray-900 shrink-0" />
                <span className="font-bold text-xs text-gray-800 leading-tight">{facility}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs italic p-4 bg-white border border-gray-200 rounded-xl text-center">
            No specific facility details registered yet.
          </p>
        )}
      </section>

      {/* Campus Life & Media Gallery */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <PhotoIcon className="w-6 h-6 text-slate-900 shrink-0" />
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight font-heading">
                Campus Life & Media Gallery
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Click any image to view in full screen with navigation
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            {albumImages.length} Photos
          </span>
        </div>

        {albumImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {albumImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xs group border border-slate-200/80 focus:outline-none focus:ring-4 focus:ring-slate-900/20"
              >
                <Image
                  src={src}
                  alt={`Campus Photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold backdrop-blur-xs">
                  <span>View Photo &rarr;</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-xs italic p-8 bg-slate-50 rounded-2xl text-center border border-slate-100">
            No media album photos available for this institution.
          </p>
        )}
      </section>

      {/* Interactive Lightbox Modal */}
      {activeImageIndex !== null && albumImages[activeImageIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Previous Image"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Active Image */}
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={albumImages[activeImageIndex]}
                alt={`Campus Photo ${activeImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 text-center text-xs font-bold text-slate-300">
              Photo {activeImageIndex + 1} of {albumImages.length}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Next Image"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CampusTab;
