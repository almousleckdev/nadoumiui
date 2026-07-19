import { type ReactNode } from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import { cn } from "@/utils/cn";
import Button from "./Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "This is usually temporary — check your connection and try again in a moment.",
  icon,
  onRetry,
  isRetrying = false,
  retryLabel = "Try Again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-orange-100 bg-orange-50/60 dark:border-slate-800 dark:bg-slate-900/60",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-4 dark:bg-slate-800">
        {icon ?? <WifiOff className="w-5 h-5 text-orange-500" aria-hidden="true" />}
      </div>
      <p className="font-semibold text-gray-900 dark:text-slate-100">{title}</p>
      <p className="text-sm mt-1 text-gray-500 max-w-sm dark:text-slate-400">{description}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} isLoading={isRetrying} className="mt-5 font-semibold">
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
