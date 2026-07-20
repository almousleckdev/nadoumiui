import React from "react";
import { UserIcon, GlobeAsiaAustraliaIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderJsonField } from "./jsonFieldRenderers";

export function EligibilitySection({ scholarship }: { scholarship: Scholarship }) {
  const hasAgeLimits = scholarship.ageMin !== undefined || scholarship.ageMax !== undefined;
  const acceptedCountries = scholarship.acceptedCountries || [];

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
        <UserIcon className="w-6 h-6 text-gray-900 shrink-0" />
        Applicant Eligibility Criteria &amp; Rules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Age Requirements */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
            Age Requirements
          </span>
          <p className="text-base font-extrabold text-gray-900">
            {hasAgeLimits
              ? `${scholarship.ageMin ?? 18} to ${scholarship.ageMax ?? 35} Years Old`
              : "Standard Admission Age Limits (18 - 35 Years)"}
          </p>
          <p className="text-xs text-gray-600 font-medium">
            {scholarship.acceptMinors ? "✓ Accepts minor applicants under 18 years old." : "Must satisfy age limits at application deadline."}
          </p>
        </div>

        {/* Eligible Nationalities */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <GlobeAsiaAustraliaIcon className="w-3.5 h-3.5" /> Eligible Nationalities
          </span>
          <p className="text-base font-extrabold text-gray-900">
            {acceptedCountries.length > 0
              ? `${acceptedCountries.length} Specified Nationalities`
              : "Open to All International Students"}
          </p>
          {acceptedCountries.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {acceptedCountries.slice(0, 8).map((c, i) => (
                <span key={i} className="text-[10px] font-semibold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-800">
                  {c}
                </span>
              ))}
              {acceptedCountries.length > 8 && (
                <span className="text-[10px] text-gray-500 font-bold self-center">
                  +{acceptedCountries.length - 8} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* China Visit Policy */}
        {scholarship.chinaVisitPolicy && (
          <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Prior China Visit Policy
            </span>
            <p className="text-sm font-bold text-gray-900">{scholarship.chinaVisitPolicy}</p>
          </div>
        )}

        {/* Current Location Requirements */}
        {scholarship.currentLocationPolicy && (
          <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Current Location Requirements
            </span>
            <p className="text-sm font-bold text-gray-900">{scholarship.currentLocationPolicy}</p>
          </div>
        )}
      </div>

      {/* General Applicant Notes & Criteria */}
      {(Boolean(scholarship.applicantRequirements) || Boolean(scholarship.requirements)) && (
        <div className="pt-2 border-t border-gray-100 space-y-4">
          <div className="flex items-center gap-2">
            <DocumentCheckIcon className="w-5 h-5 text-gray-900" />
            <h3 className="text-base font-bold text-gray-900">
              Detailed Applicant Qualification Criteria
            </h3>
          </div>

          {Boolean(scholarship.applicantRequirements) && (
            <div className="text-gray-700 text-sm bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              {renderJsonField(scholarship.applicantRequirements)}
            </div>
          )}

          {Boolean(scholarship.requirements) && !scholarship.applicantRequirements && (
            <div className="text-gray-700 text-sm bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
              {renderJsonField(scholarship.requirements)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default EligibilitySection;
