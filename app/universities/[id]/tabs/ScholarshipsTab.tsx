import type { Scholarship, ScholarshipAvailability } from "@/types";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

interface ScholarshipsTabProps {
  scholarshipAvailability: ScholarshipAvailability;
  scholarships: Scholarship[];
}

export function ScholarshipsTab({ scholarshipAvailability, scholarships }: ScholarshipsTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="py-4 border-b border-gray-100 flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Scholarship Availability</h3>
          <p className="text-gray-600">
            Status: <strong className="uppercase">{scholarshipAvailability.replace("_", " ")}</strong>
          </p>
        </div>
        <AcademicCapIcon className="w-10 h-10 text-gray-200" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">Available Scholarships</h3>
      {scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className="py-8">
          <AcademicCapIcon className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium text-lg">
            No specific scholarships found associated with this university right now.
          </p>
        </div>
      )}
    </div>
  );
}
