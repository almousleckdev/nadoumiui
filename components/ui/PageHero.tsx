import React from "react";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc?: string;
}

export function PageHero({ title, description, imageSrc = "/images/hero-group.png" }: PageHeroProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover object-center opacity-40 animate-slow-zoom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-300 text-balance leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
