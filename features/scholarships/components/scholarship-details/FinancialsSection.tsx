import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderJsonField } from "./jsonFieldRenderers";

export function FinancialsSection({ scholarship }: { scholarship: Scholarship }) {
  return (
    <section className="pb-8 border-b border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <CurrencyDollarIcon className="w-7 h-7 text-green-600" />
        Financial Breakdown
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Original Tuition Fee</p>
          <p className="text-xl font-bold text-gray-900 line-through text-gray-400">
            {scholarship.originalTuitionFee ? `¥${scholarship.originalTuitionFee}/year` : "N/A"}
          </p>
        </div>
        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
          <p className="text-sm font-medium text-orange-800 mb-1">Tuition After Scholarship</p>
          <p className="text-2xl font-bold text-orange-600">
            {scholarship.tuitionFeeAfterScholarship === 0
              ? "FREE"
              : scholarship.tuitionFeeAfterScholarship
                ? `¥${scholarship.tuitionFeeAfterScholarship}/year`
                : "N/A"}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Accommodation After Scholarship</p>
          <p className="text-xl font-bold text-gray-900">
            {scholarship.accommodationFeeAfterScholarship === 0
              ? "FREE"
              : scholarship.accommodationFeeAfterScholarship
                ? `¥${scholarship.accommodationFeeAfterScholarship}/year`
                : "N/A"}
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Stipend / Allowance</p>
          <div className="text-xl font-bold text-gray-900">
            {typeof scholarship.stipend === "string"
              ? scholarship.stipend
              : scholarship.stipend
                ? renderJsonField(scholarship.stipend)
                : "None"}
          </div>
        </div>
      </div>

      {Boolean(scholarship.feeStructure) && (
        <div className="mt-6">
          <h3 className="text-md font-bold text-gray-900 mb-2">Detailed Fee Structure</h3>
          <div className="text-gray-600">{renderJsonField(scholarship.feeStructure)}</div>
        </div>
      )}
    </section>
  );
}
