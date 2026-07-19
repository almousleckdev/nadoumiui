import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Hero({ eyebrow, title, description, children, className }: HeroProps) {
  return (
    <div className={cn("relative overflow-hidden bg-slate-900 pt-36 pb-16 sm:pt-40 sm:pb-20", className)}>
      {/* Ambient accent glows — no photography, just soft color */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-600/20 border border-orange-500/35 text-orange-400 mb-6 uppercase tracking-wider">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance">
          {title}
        </h1>
        {description && (
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-300 text-balance leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
      </div>
    </div>
  );
}

export default Hero;
