import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  subtext?: string;
}

export function MetricCard({ label, value, icon, subtext }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0">
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
