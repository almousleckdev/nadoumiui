import { type ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-900/60",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-4 dark:bg-slate-800">
        {icon ?? <Inbox className="w-5 h-5 text-gray-400" aria-hidden="true" />}
      </div>
      <p className="font-semibold text-gray-900 dark:text-slate-100">{title}</p>
      {description && (
        <p className="text-sm mt-1 text-gray-500 max-w-sm dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
