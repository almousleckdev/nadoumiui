import React from "react";
import Image from "next/image";
import type { University } from "@/types";
import {
  StarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  BookOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export function OverviewTab({
  university,
  overviewImage,
}: {
  university: University;
  overviewImage: string;
}) {
  const majors = (university.majors as any[]) || [];
  const requiredDocuments = (university.requiredDocuments as any[]) || [];

  // Group majors by degree level
  const bachelors = majors.filter((m) => m.degree === "Bachelor" || !m.degree);
  const masters = majors.filter((m) => m.degree === "Master");
  const phds = majors.filter((m) => m.degree === "PhD");
  const languages = majors.filter((m) => m.degree === "Language");

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* About Institution */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <SparklesIcon className="w-6 h-6 text-slate-900 shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
              About {university.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Institution Profile & Overview</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-sans text-base">
          <p>{university.introduction || university.description || "No detailed description available."}</p>
        </div>

        <div className="relative w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-sm group">
          <Image
            src={overviewImage}
            alt={`${university.name} Campus View`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/90 block mb-1">
              Campus Life & Environment
            </span>
            <p className="text-white font-extrabold text-xl sm:text-2xl drop-shadow-sm">
              Discover your future at {university.name}
            </p>
          </div>
        </div>
      </section>

      {/* Programs & Available Majors Architecture */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="w-6 h-6 text-slate-900 shrink-0" />
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Academic Programs & Available Majors
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Official degree levels and registered majors
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80">
            {majors.length} Registered Majors
          </span>
        </div>

        {majors.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 text-sm">
            No specific majors cataloged in the institutional registry yet. Contact admissions for details.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bachelors.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    Bachelor Degree Programs
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                    {bachelors.length} Majors
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {bachelors.map((b, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs"
                    >
                      {b.name}
                      {b.duration && <span className="ml-1 text-[10px] text-gray-400">({b.duration})</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {masters.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    Master Degree Programs
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                    {masters.length} Majors
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {masters.map((m, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {phds.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    PhD Doctorate Programs
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                    {phds.length} Majors
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {phds.map((p, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                    Language &amp; Preparatory Programs
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-600 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                    Non-degree Track
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Chinese Language Preparatory &amp; Cultural Immersion Courses.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Required Admissions Checklist */}
      {requiredDocuments.length > 0 && (
        <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <DocumentTextIcon className="w-6 h-6 text-gray-900 shrink-0" />
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Required Application Documents
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Mandatory document requirements for admission applications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requiredDocuments.map((doc: any, i: number) => (
              <div
                key={i}
                className="p-4 border border-gray-200 bg-white rounded-2xl flex items-start gap-3 shadow-2xs"
              >
                <CheckCircleIcon className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{doc.name || doc.title}</span>
                    {doc.required && (
                      <span className="text-[10px] font-extrabold text-gray-700 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        Required
                      </span>
                    )}
                  </div>
                  {doc.notes && <p className="text-xs text-gray-500 mt-1">{doc.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Highlights & Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {university.highlights && university.highlights.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <StarIcon className="w-5 h-5 text-slate-900" /> Key Highlights
            </h3>
            <ul className="space-y-3">
              {university.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-sm">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {university.advantages && university.advantages.length > 0 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <AcademicCapIcon className="w-5 h-5 text-slate-900" /> Advantages & Facilities
            </h3>
            <ul className="space-y-3">
              {university.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-slate-900 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-sm">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default OverviewTab;
