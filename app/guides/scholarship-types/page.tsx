import React from 'react';
import GuideLayout from '../components/GuideLayout';
import { Check } from "lucide-react";

import { scholarshipTypes as scholarships } from '@/data/guides';

export default function ScholarshipTypesPage() {
  return (
    <GuideLayout 
      title="Scholarship Types"
      subtitle="Explore the various financial aid options available in China. From fully-funded government grants to university-specific waivers."
      image="/images/student.jpg"
    >
      <div className="space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {scholarships.map((s) => (
            <div key={s.title} className={`bg-white rounded-2xl p-8 border ${s.highlight ? 'border-orange-500 shadow-md relative' : 'border-gray-200 shadow-sm'}`}>
              
              {s.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-200">
                  Most Competitive
                </div>
              )}

              <div className="text-center mb-8 pt-4">
                <span className="text-xs font-semibold tracking-wider uppercase mb-3 block text-gray-500">
                  {s.type}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {s.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">What's Included</h4>
                <ul className="space-y-3">
                  {s.benefits.map(benefit => (
                    <li key={benefit} className="flex items-start text-sm text-gray-600">
                      <Check className="w-5 h-5 text-orange-500 mr-3 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* ── NADOUMI EXCLUSIVE BANNER ─────────────────────────────────────────── */}
        <div className="mt-16 bg-slate-50 border border-gray-200 rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-2xl">
             <span className="inline-block px-3 py-1 rounded-md bg-white text-gray-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-gray-200 shadow-sm">
                Exclusive Access
             </span>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
               Nadoumi Partner Scholarships
             </h2>
             <p className="text-gray-600 leading-relaxed">
               We hold exclusive scholarship quotas negotiated directly with our partner universities in China. These offer guaranteed placement for qualified applicants and highly competitive tuition waivers that aren't available to the general public.
             </p>
           </div>
           <div className="shrink-0">
              <a href="/partners" className="inline-block bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                View Partners
              </a>
           </div>
        </div>

      </div>
    </GuideLayout>
  );
}
