"use client";

import { DocumentTextIcon, CurrencyDollarIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

import type { Scholarship } from "@/types";

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
}

// Type guard and helper for JSON fields
type JsonFieldArrayItem = string | { 
  name?: string; 
  documentName?: string;
  notes?: string; 
  instructions?: string;
  description?: string;
  required?: boolean; 
  [key: string]: unknown;
};

function renderJsonField(field: unknown) {
  if (!field) return null;
  if (typeof field === "string") return <p className="whitespace-pre-wrap">{field}</p>;
  
  if (Array.isArray(field)) {
    return (
      <ul className="list-disc pl-5 space-y-2">
        {(field as JsonFieldArrayItem[]).map((item, idx) => {
          if (typeof item === "string") return <li key={idx}>{item}</li>;
          if (typeof item === "object" && item !== null) {
            return (
              <li key={idx}>
                {item.name ? (
                  <div className="flex flex-col">
                    <span>
                      <strong className="text-gray-900">{item.name}</strong>
                      {item.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    {item.notes && <span className="text-sm text-gray-500">{item.notes}</span>}
                  </div>
                ) : (
                  <pre className="text-sm text-gray-500 bg-gray-50 p-2 rounded whitespace-pre-wrap">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                )}
              </li>
            );
          }
          return <li key={idx}>{String(item)}</li>;
        })}
      </ul>
    );
  }
  
  if (typeof field === "object" && field !== null) {
    return (
      <pre className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl whitespace-pre-wrap border border-gray-100 overflow-x-auto">
        {JSON.stringify(field, null, 2)}
      </pre>
    );
  }
  
  return <p>{String(field)}</p>;
}

function renderDocumentsTable(documents: unknown) {
  if (!Array.isArray(documents) || documents.length === 0) {
    if (typeof documents === "string") {
      // Split by newlines to render as simple list if it's a string
      const lines = documents.split('\n').filter(line => line.trim() !== '');
      return (
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          {lines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      );
    }
    return renderJsonField(documents);
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mt-4 border border-gray-200">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-1/3">
              Document Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/4">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Notes / Instructions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {(documents as JsonFieldArrayItem[]).map((doc, idx) => {
            const isString = typeof doc === "string";
            const name = isString ? doc : (doc.name || doc.documentName || "Unnamed Document");
            const isRequired = isString ? true : (doc.required !== false);
            const notes = isString ? "" : (doc.notes || doc.instructions || doc.description || "");

            return (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {isRequired ? (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                      Required
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Optional
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {notes || <span className="text-gray-400 italic">No additional notes</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ScholarshipDetails({ scholarship }: ScholarshipDetailsProps) {
  return (
    <div className="space-y-12">
      {/* Overview */}
      <section className="pb-8 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <InformationCircleIcon className="w-7 h-7 text-orange-600" />
          Scholarship Overview
        </h2>
        <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
          {scholarship.description}
        </div>
        
        {Boolean(scholarship.benefits) && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
            <div className="text-gray-600">{renderJsonField(scholarship.benefits)}</div>
          </div>
        )}
      </section>

      {/* Financials & Fees */}
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
              {scholarship.tuitionFeeAfterScholarship === 0 ? "FREE" : (scholarship.tuitionFeeAfterScholarship ? `¥${scholarship.tuitionFeeAfterScholarship}/year` : "N/A")}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">Accommodation After Scholarship</p>
            <p className="text-xl font-bold text-gray-900">
              {scholarship.accommodationFeeAfterScholarship === 0 ? "FREE" : (scholarship.accommodationFeeAfterScholarship ? `¥${scholarship.accommodationFeeAfterScholarship}/year` : "N/A")}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-1">Stipend / Allowance</p>
            <div className="text-xl font-bold text-gray-900">
              {typeof scholarship.stipend === "string" ? scholarship.stipend : 
               (scholarship.stipend ? renderJsonField(scholarship.stipend) : "None")}
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

      {/* Requirements & Documents */}
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
              <p className="text-sm text-gray-500 mb-2">Please ensure all required documents are translated (if necessary) and clear before submitting.</p>
              {renderDocumentsTable(scholarship.applicationDocuments)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
