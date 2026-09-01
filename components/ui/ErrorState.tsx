import { type ReactNode } from "react";
import { WifiOff, AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@/utils/cn";
import { isNetworkError, getErrorMessage } from "@/utils/getErrorMessage";
import Button from "./Button";

export interface ErrorStateProps {
  error?: unknown;
  title?: string;
  description?: string;
  icon?: ReactNode;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  error,
  title,
  description,
  icon,
  onRetry,
  isRetrying = false,
  retryLabel = "Try Again",
  className,
}: ErrorStateProps) {
  const isNetwork = error ? isNetworkError(error) : false;

  const resolvedTitle =
    title ??
    (isNetwork ? "Server is unreachable" : "Something went wrong");

  const resolvedDescription =
    description ??
    (isNetwork
      ? "Unable to connect to the backend server. Please verify your internet connection or ensure the backend is running."
      : error
      ? getErrorMessage(error)
      : "This is usually temporary — check your connection and try again in a moment.");

  const defaultIcon = isNetwork ? (
    <WifiOff className="w-5 h-5 text-orange-500" aria-hidden="true" />
  ) : (
    <AlertTriangle className="w-5 h-5 text-orange-500" aria-hidden="true" />
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-orange-100 bg-orange-50/60 dark:border-slate-800 dark:bg-slate-900/60",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-4 dark:bg-slate-800">
        {icon ?? defaultIcon}
      </div>
      <p className="font-semibold text-gray-900 dark:text-slate-100">{resolvedTitle}</p>
      <p className="text-sm mt-1 text-gray-500 max-w-sm dark:text-slate-400">{resolvedDescription}</p>
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
