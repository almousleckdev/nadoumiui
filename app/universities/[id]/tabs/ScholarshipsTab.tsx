import React from "react";
import type { Scholarship, ScholarshipAvailability } from "@/types";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import { AcademicCapIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface ScholarshipsTabProps {
  scholarshipAvailability: ScholarshipAvailability;
  scholarships: Scholarship[];
}

export function ScholarshipsTab({ scholarshipAvailability, scholarships }: ScholarshipsTabProps) {
  const isAvailable = scholarshipAvailability === "Available";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-slate-900 shrink-0" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Institutional Funding Status
            </h3>
          </div>
          <p className="text-2xl font-black tracking-tight text-slate-900 font-heading">
            {isAvailable ? "Active Scholarship Funding" : "Limited Institutional Quota"}
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Current Status: <span className="font-bold text-slate-900 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{scholarshipAvailability.replace("_", " ")}</span>
          </p>
        </div>
        <AcademicCapIcon className="w-8 h-8 text-slate-900 shrink-0" />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
            Available Scholarship Programs
          </h3>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {scholarships.length} Offered Programs
          </span>
        </div>

        {scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <AcademicCapIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900">No Programs Listed</h4>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
              There are currently no active scholarship programs registered directly under this university. Contact our advisors for unlisted opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScholarshipsTab;
