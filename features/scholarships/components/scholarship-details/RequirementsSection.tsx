import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderDocumentsTable, renderJsonField } from "./jsonFieldRenderers";

export function RequirementsSection({ scholarship }: { scholarship: Scholarship }) {
  return (
    <section className="pb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
        <DocumentTextIcon className="w-7 h-7 text-blue-600" />
        Requirements & Documents
      </h2>

      <div className="space-y-10 text-gray-600">
        {Boolean(scholarship.requirements) && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full inline-block"></span>
              General Requirements
            </h3>
            <div className="text-gray-600 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              {renderJsonField(scholarship.requirements)}
            </div>
          </div>
        )}

        {(scholarship.scoreRequirementsEnglish || scholarship.scoreRequirementsChinese) && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full inline-block"></span>
              Language Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scholarship.scoreRequirementsEnglish && (
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">English</p>
                  <p className="text-lg font-medium text-gray-900">{scholarship.scoreRequirementsEnglish}</p>
                </div>
              )}
              {scholarship.scoreRequirementsChinese && (
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Chinese (HSK)</p>
                  <p className="text-lg font-medium text-gray-900">{scholarship.scoreRequirementsChinese}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {Boolean(scholarship.applicationDocuments) && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block"></span>
              Required Documents Checklist
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Please ensure all required documents are translated (if necessary) and clear before submitting.
            </p>
            {renderDocumentsTable(scholarship.applicationDocuments)}
          </div>
        )}
      </div>
    </section>
  );
}
