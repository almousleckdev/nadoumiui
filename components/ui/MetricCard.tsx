import React from "react";
import { cn } from "@/utils/cn";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  /** Overrides the icon wrapper's color classes (bg/text/border), e.g. "text-blue-600 bg-blue-50 border-blue-100". */
  iconClassName?: string;
  subtext?: string;
}

export function MetricCard({ label, value, icon, iconClassName, subtext }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
      {icon && (
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            iconClassName || "bg-slate-50 text-slate-600"
          )}
        >
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
}
