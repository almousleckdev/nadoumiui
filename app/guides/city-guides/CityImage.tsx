"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function CityImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 text-white/80">
        <MapPin className="w-6 h-6" aria-hidden="true" />
        <span className="text-sm font-semibold">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
