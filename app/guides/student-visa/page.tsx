import React from 'react';
import GuideLayout from '../components/GuideLayout';
import { Check } from "lucide-react";

export default function StudentVisaPage() {
  return (
    <GuideLayout 
      title="Student Visa Guide"
      subtitle="Navigating Chinese immigration requirements. Learn about the X1 and X2 visas, documentation, and the residence permit process."
      image="/images/student.jpg"
    >
      <div className="space-y-16">
        
        {/* ── VISA TYPES ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Student Visas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 text-orange-600 font-bold text-lg mb-6 border border-orange-100">
                X1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Long-term Study</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Issued to students who intend to study in China for a period of more than 180 days. This is the standard visa for degree-seeking students.
              </p>
              <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-lg border border-blue-100">
                <strong>Important:</strong> The X1 visa is only valid for 30 days. You must apply for a Temporary Residence Permit within 30 days of arrival.
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-gray-700 font-bold text-lg mb-6 border border-gray-200">
                X2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Short-term Study</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Issued to students who intend to study in China for a period of no more than 180 days. Ideal for summer programs or single-semester exchanges.
              </p>
              <div className="bg-gray-50 text-gray-700 text-sm p-4 rounded-lg border border-gray-200">
                <strong>Note:</strong> X2 visas usually have a fixed duration (e.g., 90 or 150 days) and typically allow for a single entry.
              </div>
            </div>
          </div>
        </div>

        {/* ── REQUIRED DOCUMENTS ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documentation</h2>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 max-w-4xl">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Valid Passport:</strong> Original passport with at least six months of remaining validity and blank visa pages.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Visa Application Form:</strong> Completed accurately online and printed.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Photo:</strong> Recent passport-style color photo against a light background.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Admission Notice:</strong> Original and photocopy of the official Admission Letter issued by the university.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>JW201 or JW202 Form:</strong> Original and photocopy of the "Visa Application for Study in China" form.</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-3 mt-0.5 shrink-0" />
                <span><strong>Physical Examination Record:</strong> Required for X1 visas (sometimes accepted upon arrival, verify with your local embassy).</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </GuideLayout>
  );
}
