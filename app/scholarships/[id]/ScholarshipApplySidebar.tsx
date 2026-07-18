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

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-gray-500">Available Slots</p>
            {scholarship.availableSlots > 0 ? (
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                {scholarship.availableSlots} left
              </span>
            ) : (
              <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">Limited</span>
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

        {university && (
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Host Institution</h3>
            <div className="flex items-center gap-4 mb-5">
              {university.logo ? (
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={university.logo}
                    alt={university.name}
                    fill
                    className="object-contain rounded-xl border border-gray-100 p-1"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                  <AcademicCapIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900 leading-tight mb-1">{university.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                  <MapPinIcon className="w-4 h-4 text-orange-500" />
                  {university.city}, {university.province}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2 text-sm font-bold bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200"
              onClick={() => router.push(`/universities/${university.id}`)}
            >
              View University Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
