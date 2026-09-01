import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface LoadingProps {
  variant?: "spinner" | "page" | "overlay" | "skeleton" | "icon";
  text?: string;
  className?: string;
}

export function Loading({ variant = "spinner", text, className }: LoadingProps) {
  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse bg-gray-200 dark:bg-slate-800 rounded-md", className)} />
    );
  }

  if (variant === "icon") {
    // Bare rotating icon, no wrapper/text — for embedding inline in buttons,
    // badges, or other compact spaces the other variants' padding doesn't fit.
    return <Loader2 className={cn("w-5 h-5 animate-spin text-orange-600 dark:text-orange-500", className)} />;
  }

  if (variant === "overlay") {
    return (
      <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm", className)}>
        <Loader2 className="w-8 h-8 animate-spin text-orange-600 dark:text-orange-500" />
        {text && <p className="mt-2 text-sm font-medium text-gray-700 dark:text-slate-300">{text}</p>}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={cn("flex min-h-[60vh] w-full flex-col items-center justify-center", className)}>
        <Loader2 className="w-10 h-10 animate-spin text-orange-600 dark:text-orange-500" />
        {text && <p className="mt-4 text-sm font-medium text-gray-500 dark:text-slate-400">{text}</p>}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("flex flex-col items-center justify-center p-4", className)}>
      <Loader2 className="w-6 h-6 animate-spin text-orange-600 dark:text-orange-500" />
      {text && <p className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">{text}</p>}
    </div>
  );
}

export default Loading;
