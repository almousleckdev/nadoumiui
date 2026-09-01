"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface UniversityGalleryProps {
  images: string[];
}

export function UniversityGallery({ images }: UniversityGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedImageIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
    },
    [images.length]
  );

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedImageIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
    },
    [images.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, showNext, showPrev]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.slice(0, 4).map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="relative h-32 md:h-48 rounded-xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={img}
              alt={`Campus view ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {idx === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          
          <button
            onClick={showPrev}
            className="absolute left-6 p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          
          <div className="relative w-[85vw] h-[85vh]">
            <Image
              src={images[selectedImageIndex]}
              alt="Campus view full"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <button
            onClick={showNext}
            className="absolute right-6 p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-wide">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
