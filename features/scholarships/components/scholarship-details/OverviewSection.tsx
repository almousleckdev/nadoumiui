import React from "react";
import {
  InformationCircleIcon,
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  SparklesIcon,
  FireIcon,
  TagIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderJsonField } from "./jsonFieldRenderers";

export function OverviewSection({ scholarship }: { scholarship: Scholarship }) {
  const programSelection = scholarship.programSelection as any;
  const fallbackMajors = (scholarship.universityMajors as any[]) || [];

  // Parse program list
  let programList: Array<{ programType: string; majors?: string[]; stipendAmount?: number | null }> = [];

  if (Array.isArray(programSelection) && programSelection.length > 0) {
    programList = programSelection.map((p) => ({
      programType: p.programType,
      majors: Array.isArray(p.majors) ? p.majors : [],
      stipendAmount: p.stipendAmount ? Number(p.stipendAmount) : null,
    }));
  } else if (programSelection && typeof programSelection === "object") {
    programList = Object.entries(programSelection).map(([type, val]: [string, any]) => ({
      programType: type,
      majors: Array.isArray(val?.majors) ? val.majors : [],
      stipendAmount: val?.stipendAmount ? Number(val.stipendAmount) : null,
    }));
  }

  // If programList majors are empty, fallback to universityMajors
  if (
    programList.length === 0 ||
    programList.every((p) => !p.majors || p.majors.length === 0)
  ) {
    const categories = scholarship.programCategories || ["Bachelor", "Master", "PhD"];
    programList = categories.map((cat) => {
      const catMajors = fallbackMajors
        .filter((m) => !m.degree || m.degree === cat || (cat === "Bachelor" && m.degree === "Bachelor"))
        .map((m) => (typeof m === "string" ? m : m.name));

      return {
        programType: cat,
        majors: catMajors.length > 0 ? catMajors : fallbackMajors.map((m) => (typeof m === "string" ? m : m.name)),
      };
    });
  }

  // Calculate total majors across all tracks
  const totalMajorsCount = programList.reduce((acc, p) => acc + (p.majors?.length || 0), 0);

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      {/* System Flags & Tags Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
        {scholarship.isRecommended && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <SparklesIcon className="w-3.5 h-3.5" /> Featured Scholarship
          </span>
        )}
        {scholarship.isHot && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            <FireIcon className="w-3.5 h-3.5 text-rose-600" /> High Demand
          </span>
        )}
        {scholarship.isTop && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            <ShieldCheckIcon className="w-3.5 h-3.5" /> Top Pick Program
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gray-100 text-gray-800 border border-gray-200">
          <TagIcon className="w-3.5 h-3.5 text-gray-500" /> {scholarship.scholarshipCategory?.replace("_", " ") || "Scholarship"}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gray-100 text-gray-800 border border-gray-200">
          <AcademicCapIcon className="w-3.5 h-3.5 text-gray-500" /> {scholarship.teachingLanguage || "English"} Medium
        </span>
      </div>

      {/* Program Dates & Deadlines Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-red-600 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Application Deadline
            </span>
            <span className="text-sm font-black text-red-600 block">
              {scholarship.applicationDeadline
                ? new Date(scholarship.applicationDeadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Open for Applications"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ClockIcon className="w-6 h-6 text-gray-900 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Program Intake
            </span>
            <span className="text-sm font-extrabold text-gray-900 block">
              {scholarship.intake || scholarship.startDate || "Autumn Intake"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AcademicCapIcon className="w-6 h-6 text-gray-900 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Scholarship Duration
            </span>
            <span className="text-sm font-extrabold text-gray-900 block">
              {scholarship.scholarshipDurationText || (scholarship.scholarshipDuration ? `${scholarship.scholarshipDuration} Years` : "Full Program Duration")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <InformationCircleIcon className="w-6 h-6 text-gray-900 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Available Quota
            </span>
            <span className="text-sm font-extrabold text-gray-900 block">
              {scholarship.availableSlots ? `${scholarship.availableSlots} Open Seats` : "Limited Quota"}
            </span>
          </div>
        </div>
      </div>

      {/* Overview Description */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 mb-3">
          Scholarship Overview &amp; Description
        </h2>
        <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed font-sans text-base">
          <p>{scholarship.description || "No description provided."}</p>
        </div>
      </div>

      {/* Eligible Programs & Available Majors Catalog */}
      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-gray-900" />
            <h3 className="text-base font-bold text-gray-900">
              Eligible Programs &amp; Available Majors
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {totalMajorsCount > 0 ? `${totalMajorsCount} Available Majors` : "Open Catalog"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programList.map((prog, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-gray-200 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900">
                  {prog.programType} Degree Level
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">
                  {prog.programType === "Language"
                    ? "Non-Degree"
                    : prog.majors && prog.majors.length > 0
                      ? `${prog.majors.length} Registered Majors`
                      : "General Admissions"}
                </span>
              </div>

              {prog.programType === "Language" ? (
                <p className="text-xs text-gray-600 font-medium">
                  Chinese Language Preparatory &amp; Intensive Cultural Immersion Courses.
                </p>
              ) : prog.majors && prog.majors.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prog.majors.map((m, i) => (
                    <span key={i} className="text-xs font-semibold bg-white text-gray-800 border border-gray-200 px-2.5 py-1 rounded-md shadow-2xs">
                      {m}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Open to all registered academic majors under the {prog.programType} track.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coverage & Benefits */}
      {Boolean(scholarship.benefits) && (
        <div className="pt-2">
          <h3 className="text-base font-bold text-gray-900 mb-3">Scholarship Coverage &amp; Benefits</h3>
          <div className="text-gray-700 text-sm bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            {renderJsonField(scholarship.benefits)}
          </div>
        </div>
      )}

      {/* Policies & Notes */}
      {(scholarship.specialNotes || scholarship.scholarshipPolicy || scholarship.recommendationNotes) && (
        <div className="space-y-3 pt-2">
          {scholarship.specialNotes && (
            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 space-y-1 shadow-2xs">
              <span className="font-extrabold text-gray-900 block">Important Program Notes</span>
              <p>{scholarship.specialNotes}</p>
            </div>
          )}
          {scholarship.scholarshipPolicy && (
            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 space-y-1 shadow-2xs">
              <span className="font-extrabold text-gray-900 block">Scholarship Policy &amp; Terms</span>
              <p>{scholarship.scholarshipPolicy}</p>
            </div>
          )}
          {scholarship.recommendationNotes && (
            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 space-y-1 shadow-2xs">
              <span className="font-extrabold text-gray-900 block">Expert Recommendation Notes</span>
              <p>{scholarship.recommendationNotes}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default OverviewSection;
