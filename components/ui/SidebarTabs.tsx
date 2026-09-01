"use client";

import { cn } from "@/utils/cn";

export interface SidebarTab<TId extends string = string> {
  id: TId;
  label: string;
}

interface SidebarTabsProps<TId extends string> {
  tabs: readonly SidebarTab<TId>[];
  activeTab: TId;
  onChange: (id: TId) => void;
  /** Optional per-tab validation-error count, rendered as a badge (e.g. from useTabErrorCount). */
  getErrorCount?: (id: TId) => number;
  className?: string;
}

/**
 * Vertical sidebar tab list used by multi-section admin forms (Scholarship,
 * University), as opposed to the horizontal underline `Tabs` component used
 * for content-page tab bars — the two are visually and structurally distinct,
 * not variants of one another.
 */
export function SidebarTabs<TId extends string>({
  tabs,
  activeTab,
  onChange,
  getErrorCount,
  className,
}: SidebarTabsProps<TId>) {
  return (
    <div className={cn("w-full md:w-64 shrink-0 space-y-1", className)}>
      {tabs.map((tab) => {
        const errorCount = getErrorCount?.(tab.id) ?? 0;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200",
              isActive
                ? "bg-orange-50 text-orange-600 border border-orange-200/80 shadow-xs"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              errorCount > 0 && !isActive && "bg-rose-50/60 text-rose-700 border border-rose-200"
            )}
          >
            <span>{tab.label}</span>
            {errorCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-rose-600 rounded-full shrink-0 shadow-xs">
                {errorCount} {errorCount === 1 ? "error" : "errors"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
