import React from "react";
import { DocumentTextIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderDocumentsTable } from "./jsonFieldRenderers";

export function RequirementsSection({ scholarship }: { scholarship: Scholarship }) {
  const hasSpecificScores =
    (scholarship.gpaMin !== undefined && scholarship.gpaMin !== null) ||
    (scholarship.ieltsScore !== undefined && scholarship.ieltsScore !== null) ||
    (scholarship.toeflScore !== undefined && scholarship.toeflScore !== null) ||
    (scholarship.duolingoScore !== undefined && scholarship.duolingoScore !== null) ||
    (scholarship.hskLevel !== undefined && scholarship.hskLevel !== null);

  const hasScoreNotes =
    Boolean(scholarship.scoreRequirementsEnglish) ||
    Boolean(scholarship.scoreRequirementsChinese) ||
    Boolean(scholarship.scoreRequirements);

  const documents = (scholarship.applicationDocuments as any[]) || [];
  const additionalDocs = (scholarship.additionalDocuments as any[]) || [];

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
        <DocumentTextIcon className="w-6 h-6 text-gray-900 shrink-0" />
        Academic Criteria &amp; Application Documents
      </h2>

      <div className="space-y-6 text-gray-700">
        {/* Score & Language Requirements */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5 text-gray-900" />
            Academic GPA &amp; Language Proficiency Thresholds
          </h3>

          {hasSpecificScores ? (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {scholarship.gpaMin !== undefined && scholarship.gpaMin !== null && (
                <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    GPA Minimum
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {scholarship.gpaMin} / 4.0
                  </span>
                </div>
              )}

              {scholarship.ieltsScore !== undefined && scholarship.ieltsScore !== null && (
                <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    IELTS Score
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {scholarship.ieltsScore}+
                  </span>
                </div>
              )}

              {scholarship.toeflScore !== undefined && scholarship.toeflScore !== null && (
                <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    TOEFL iBT
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {scholarship.toeflScore}+
                  </span>
                </div>
              )}

              {scholarship.duolingoScore !== undefined && scholarship.duolingoScore !== null && (
                <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Duolingo DET
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    {scholarship.duolingoScore}+
                  </span>
                </div>
              )}

              {scholarship.hskLevel !== undefined && scholarship.hskLevel !== null && (
                <div className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Chinese HSK
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    HSK {scholarship.hskLevel}+
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-700 font-medium">
              Standard holistic academic evaluation. Minimum GPA and language proficiency requirements depend on specific degree track.
            </div>
          )}

          {hasScoreNotes && (
            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-800 space-y-2 shadow-2xs">
              {scholarship.scoreRequirementsEnglish && (
                <p><strong>English Proficiency Note:</strong> {scholarship.scoreRequirementsEnglish}</p>
              )}
              {scholarship.scoreRequirementsChinese && (
                <p><strong>Chinese Proficiency Note:</strong> {scholarship.scoreRequirementsChinese}</p>
              )}
              {scholarship.scoreRequirements && (
                <p><strong>General Score Threshold Note:</strong> {scholarship.scoreRequirements}</p>
              )}
            </div>
          )}
        </div>

        {/* Required Documents Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-gray-900">
            Mandatory Application Documents Checklist
          </h3>
          <p className="text-xs text-gray-500">
            Official documents required for admission application submission and verification.
          </p>

          {documents.length > 0 ? (
            renderDocumentsTable(documents)
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Valid International Passport Copy", notes: "Information page with at least 6 months validity" },
                { name: "Highest Academic Diploma / Graduation Certificate", notes: "Notarized English or Chinese translation" },
                { name: "Official Academic Transcripts", notes: "Complete record of grades from previous institution" },
                { name: "Foreigner Physical Examination Form", notes: "Standard official medical checkup report" },
                { name: "Non-Criminal Record Certificate", notes: "Police clearance certificate from home country" },
                { name: "Passport-size Photo", notes: "White background digital photo" },
              ].map((doc, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
                  <span className="font-bold text-xs text-gray-900 block flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                    {doc.name}
                  </span>
                  <span className="text-[11px] text-gray-500 block">{doc.notes}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {additionalDocs.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-base font-bold text-gray-900">
              Additional Program Specific Documents
            </h3>
            <p className="text-xs text-gray-500">
              Extra documents specifically requested for funding qualification.
            </p>
            {renderDocumentsTable(additionalDocs)}
          </div>
        )}
      </div>
    </section>
  );
}

export default RequirementsSection;
