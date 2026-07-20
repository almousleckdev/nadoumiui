import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Scholarship, University } from "@/types";
import Button from "@/components/ui/Button";
import { ClockIcon, ShieldCheckIcon, AcademicCapIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ScholarshipApplySidebarProps {
  scholarship: Scholarship;
  university: University | undefined;
  daysLeft: number;
  isUrgent: boolean;
}

export function ScholarshipApplySidebar({ scholarship, university, daysLeft, isUrgent }: ScholarshipApplySidebarProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="sticky top-24 space-y-8">
        <div className="pb-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply Now</h3>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-500">Available Quota</p>
            {scholarship.availableSlots > 0 ? (
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs">
                {scholarship.availableSlots} Open Seats
              </span>
            ) : (
              <span className="text-red-700 font-bold bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs">Limited Seats</span>
            )}
          </div>

          {/* Pricing Highlight Box */}
          <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 space-y-2 shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Tuition Rate:</span>
              <span className="text-sm font-black text-red-600">
                {scholarship.tuitionFeeAfterScholarship === 0
                  ? "FREE"
                  : scholarship.tuitionFeeAfterScholarship
                    ? `${scholarship.universityFeeCurrency === "USD" ? "$" : "¥"}${scholarship.tuitionFeeAfterScholarship.toLocaleString()}/yr`
                    : "Scholarship Rate"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Accommodation:</span>
              <span className="text-sm font-black text-red-600">
                {scholarship.accommodationFeeAfterScholarship === 0
                  ? "FREE"
                  : scholarship.accommodationFeeAfterScholarship
                    ? `${scholarship.universityFeeCurrency === "USD" ? "$" : "¥"}${scholarship.accommodationFeeAfterScholarship.toLocaleString()}/yr`
                    : "Standard Housing"}
              </span>
            </div>
            {(scholarship.nadoumiApplicationFee !== undefined || scholarship.nadoumiServiceFee !== undefined) && (
              <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Nadoumi Fee:</span>
                <span className="text-sm font-black text-red-600">
                  ${(scholarship.nadoumiApplicationFee || 0) + (scholarship.nadoumiServiceFee || 0)} USD
                </span>
              </div>
            )}
          </div>

          {isUrgent && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-red-500" />
              Closing soon! Only {daysLeft} days remaining.
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button variant="primary" className="shadow-md shadow-blue-500/20">
              Start Application
            </Button>
            <Button variant="outline" className="border-2 text-gray-700">
              Contact Advisor
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
            Official Nadoumi Processing
          </div>
        </div>

        {scholarship.locations?.[0] && (
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Location</h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-slate-900 shrink-0" />
              <div>
                <span className="font-bold text-sm text-slate-900 block">
                  {scholarship.locations[0].city ? `${scholarship.locations[0].city}, ` : ""}{scholarship.locations[0].province || "China"}
                </span>
                <span className="text-xs text-slate-500 font-medium">Mainland China Region</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
