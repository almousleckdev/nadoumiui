import React from "react";
import type { University } from "@/types";
import {
  MapPinIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export function LocationTab({ university }: { university: University }) {
  const city = university.city || "China";
  const province = university.province || "Mainland China";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-slate-900 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Regional Location & Contacts
          </span>
        </div>
        <h2 className="text-2xl font-black tracking-tight font-heading text-slate-900">
          {city}, {province}
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
          {university.name} is situated in {city}, {province} — one of China&apos;s dynamic centers of education, innovation, and rich cultural heritage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <EnvelopeIcon className="w-6 h-6 text-slate-900 shrink-0" />
            <div>
              <h3 className="text-lg font-black text-slate-900">Official Contact Details</h3>
              <p className="text-xs text-slate-500">Direct admissions and institutional contact channels</p>
            </div>
          </div>

          <div className="space-y-4">
            {university.officialWebsite ? (
              <a
                href={
                  university.officialWebsite.startsWith("http")
                    ? university.officialWebsite
                    : `https://${university.officialWebsite}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-between transition-colors group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                      Official Portal
                    </span>
                    <span className="font-bold text-sm text-gray-900 group-hover:text-blue-600">
                      {university.officialWebsite.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600">Visit site &rarr;</span>
              </a>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-3 shadow-2xs">
                <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Official website listed in partner portal.</span>
              </div>
            )}

            {university.admissionsEmail ? (
              <a
                href={`mailto:${university.admissionsEmail}`}
                className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 flex items-center gap-3 transition-colors group shadow-2xs"
              >
                <EnvelopeIcon className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Admissions Email
                  </span>
                  <span className="font-bold text-sm text-gray-900 group-hover:text-blue-600">
                    {university.admissionsEmail}
                  </span>
                </div>
              </a>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center gap-3 shadow-2xs">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Admissions inquiries handled via Nadoumi portal.</span>
              </div>
            )}

            {university.officePhone && (
              <a
                href={`tel:${university.officePhone}`}
                className="p-4 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 flex items-center gap-3 transition-colors group shadow-2xs"
              >
                <PhoneIcon className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Admissions Hotline
                  </span>
                  <span className="font-bold text-sm text-gray-900 group-hover:text-blue-600">
                    {university.officePhone}
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* City & Regional Culture Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <BuildingLibraryIcon className="w-6 h-6 text-gray-900 shrink-0" />
            <div>
              <h3 className="text-lg font-black text-gray-900">City &amp; Regional Heritage</h3>
              <p className="text-xs text-gray-500">Living and studying in {city}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                <SparklesIcon className="w-4 h-4 text-gray-900" />
                <span>Cultural &amp; Educational Hub</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {city} in {province} offers international students an extraordinary blend of historical heritage, modern innovation, and affordable high-quality living.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <SunIcon className="w-3.5 h-3.5 text-gray-900" />
                  <span>Climate &amp; Lifestyle</span>
                </div>
                <p className="text-[11px] text-gray-500">Distinct seasonal beauty &amp; welcoming international community.</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <MapPinIcon className="w-3.5 h-3.5 text-gray-900" />
                  <span>Transportation</span>
                </div>
                <p className="text-[11px] text-gray-500">Connected by high-speed rail network and modern metro system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationTab;
