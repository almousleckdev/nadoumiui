import Image from "next/image";
import type { University } from "@/types";
import { MapPinIcon, GlobeAltIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export function LocationTab({ university }: { university: University }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">Location & Contact</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact Info */}
        <div className="space-y-6 pt-4 relative">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <MapPinIcon className="w-4 h-4 text-orange-500" /> Headquarters
            </span>
            <span className="text-2xl font-extrabold text-gray-900">
              {university.city}, {university.province}
            </span>
          </div>

          <div className="h-px w-full bg-gray-100"></div>

          {university.officialWebsite && (
            <div className="flex flex-col gap-1 group">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Website</span>
              <a
                href={university.officialWebsite.startsWith("http") ? university.officialWebsite : `https://${university.officialWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-2"
              >
                <GlobeAltIcon className="w-5 h-5" />
                {university.officialWebsite.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {university.admissionsEmail && (
            <div className="flex flex-col gap-1 group">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admissions Office</span>
              <a
                href={`mailto:${university.admissionsEmail}`}
                className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                {university.admissionsEmail}
              </a>
            </div>
          )}

          {university.officePhone && (
            <div className="flex flex-col gap-1 group">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</span>
              <a
                href={`tel:${university.officePhone}`}
                className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                {university.officePhone}
              </a>
            </div>
          )}
        </div>

        {/* Right: Map Placeholder / Visual */}
        <div className="relative bg-slate-100 rounded-3xl overflow-hidden shadow-sm h-[400px] border border-gray-200 flex items-center justify-center group">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
            alt="Map Location"
            fill
            className="object-cover opacity-60 group-hover:opacity-70 transition-opacity"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          <div className="relative z-10 text-center bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[80%]">
            <MapPinIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" />
            <p className="font-bold text-gray-900 text-lg">Map View Coming Soon</p>
            <p className="text-sm text-gray-600 mt-1">
              Explore the vibrant campus of {university.name} in {university.city}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
