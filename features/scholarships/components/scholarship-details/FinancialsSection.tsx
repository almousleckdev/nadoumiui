import React from "react";
import { CurrencyDollarIcon, BanknotesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderJsonField } from "./jsonFieldRenderers";

export function FinancialsSection({ scholarship }: { scholarship: Scholarship }) {
  const programSelection = scholarship.programSelection as any;
  let stipendList: Array<{ programType: string; stipendAmount?: number | null }> = [];

  if (Array.isArray(programSelection)) {
    stipendList = programSelection.filter((p) => p.stipendAmount && Number(p.stipendAmount) > 0);
  } else if (programSelection && typeof programSelection === "object") {
    stipendList = Object.entries(programSelection)
      .map(([type, val]: [string, any]) => ({
        programType: type,
        stipendAmount: val?.stipendAmount ? Number(val.stipendAmount) : null,
      }))
      .filter((p) => p.stipendAmount && Number(p.stipendAmount) > 0);
  }

  // Currency symbol logic
  const currency = scholarship.universityFeeCurrency || "RMB";
  const currencySymbol = currency === "USD" ? "$" : "¥";

  const nadoumiCurrency = scholarship.nadoumiFeeCurrency || "USD";
  const nadoumiSymbol = nadoumiCurrency === "RMB" ? "¥" : "$";

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-3">
        <CurrencyDollarIcon className="w-6 h-6 text-gray-900 shrink-0" />
        Financial Breakdown &amp; Fee Structure
      </h2>

      {/* Primary University Fees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Original Tuition */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Original Tuition Fee
          </span>
          <span className="text-base font-bold text-gray-400 line-through block">
            {scholarship.originalTuitionFee
              ? `${currencySymbol}${scholarship.originalTuitionFee.toLocaleString()} ${currency}/year`
              : "Standard University Rate"}
          </span>
        </div>

        {/* Tuition After Scholarship */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
            Tuition After Scholarship
          </span>
          <span className="text-xl font-black text-red-600 block">
            {scholarship.tuitionFeeAfterScholarship === 0
              ? "FREE (100% Covered)"
              : scholarship.tuitionFeeAfterScholarship !== undefined && scholarship.tuitionFeeAfterScholarship !== null
                ? `${currencySymbol}${scholarship.tuitionFeeAfterScholarship.toLocaleString()} ${currency}/year`
                : "Covered by Scholarship"}
          </span>
        </div>

        {/* Accommodation Fee */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Accommodation Fee
          </span>
          <span className="text-xl font-black text-red-600 block">
            {scholarship.accommodationFeeAfterScholarship === 0
              ? "FREE (Dormitory Covered)"
              : scholarship.accommodationFeeAfterScholarship !== undefined && scholarship.accommodationFeeAfterScholarship !== null
                ? `${currencySymbol}${scholarship.accommodationFeeAfterScholarship.toLocaleString()} ${currency}/year`
                : scholarship.accommodationFee || "Campus Dormitory Rate"}
          </span>
        </div>

        {/* University Registration Fee */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            University Registration Fee
          </span>
          <span className="text-lg font-extrabold text-red-600 block">
            {scholarship.registrationFee || "¥400 - ¥800 RMB (Standard Admission Fee)"}
          </span>
        </div>

        {/* Visa Processing Fee */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Visa Processing Fee (JW202/X1)
          </span>
          <span className="text-lg font-extrabold text-red-600 block">
            {scholarship.visaFee === 0
              ? "FREE (Covered)"
              : scholarship.visaFee !== undefined && scholarship.visaFee !== null
                ? `${currencySymbol}${scholarship.visaFee} ${currency}`
                : "¥400 RMB (Standard JW202 Processing)"}
          </span>
        </div>

        {/* Medical Insurance / Assurance */}
        <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1 shadow-2xs">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Medical Insurance / Health Assurance
          </span>
          <span className="text-lg font-extrabold text-red-600 block">
            {scholarship.insurance || "¥800 RMB/year (Comprehensive Insurance)"}
          </span>
        </div>
      </div>

      {/* Nadoumi Agency Fees Section */}
      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          <ShieldCheckIcon className="w-5 h-5 text-gray-900" />
          <h3 className="text-base font-bold text-gray-900">
            Nadoumi Agency &amp; Application Processing Fees
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Application Processing Fee
            </span>
            <span className="text-xl font-black text-red-600 block">
              {scholarship.nadoumiApplicationFee !== undefined && scholarship.nadoumiApplicationFee !== null
                ? `${nadoumiSymbol}${scholarship.nadoumiApplicationFee} ${nadoumiCurrency}`
                : "$100 USD"}
            </span>
            <span className="text-xs text-gray-500 font-medium block">
              Official application review &amp; document translation dispatch.
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Service &amp; Assistance Fee
            </span>
            <span className="text-xl font-black text-red-600 block">
              {scholarship.nadoumiServiceFee !== undefined && scholarship.nadoumiServiceFee !== null
                ? `${nadoumiSymbol}${scholarship.nadoumiServiceFee} ${nadoumiCurrency}`
                : "$250 USD"}
            </span>
            <span className="text-xs text-gray-500 font-medium block">
              Dedicated admissions assistance, JW202 form support &amp; visa guidance.
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Living Stipends */}
      {(scholarship.hasStipend || stipendList.length > 0 || scholarship.stipend) && (
        <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <BanknotesIcon className="w-5 h-5 text-gray-900" />
            <h3 className="text-base font-bold text-gray-900">
              Monthly Living Allowance / Stipend
            </h3>
          </div>

          {stipendList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stipendList.map((st, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {st.programType} Degree Track
                  </span>
                  <span className="text-lg font-black text-red-600 block">
                    ¥{st.stipendAmount?.toLocaleString()}/month
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-base font-black text-red-600">
              {typeof scholarship.stipend === "string"
                ? scholarship.stipend
                : scholarship.stipend
                  ? renderJsonField(scholarship.stipend)
                  : "Monthly Living Allowance Provided"}
            </div>
          )}
        </div>
      )}

      {/* Detailed Fee Notes */}
      {(Boolean(scholarship.feeStructure) || Boolean(scholarship.additionalFees)) && (
        <div className="pt-2 border-t border-gray-100 space-y-3">
          {Boolean(scholarship.feeStructure) && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Detailed Institutional Fee Breakdown</h3>
              <div className="text-gray-700 text-sm bg-white p-4 rounded-xl border border-gray-200">{renderJsonField(scholarship.feeStructure)}</div>
            </div>
          )}
          {Boolean(scholarship.additionalFees) && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Additional Miscellaneous Campus Fees</h3>
              <div className="text-gray-700 text-sm bg-white p-4 rounded-xl border border-gray-200">{renderJsonField(scholarship.additionalFees)}</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default FinancialsSection;
