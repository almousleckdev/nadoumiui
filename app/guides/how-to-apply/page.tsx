import React from 'react';
import GuideLayout from '../components/GuideLayout';

import { howToApplySteps as steps } from '@/data/guides';

export default function HowToApplyPage() {
  return (
    <GuideLayout 
      title="How to Apply"
      subtitle="A clear, step-by-step roadmap to securing your admission and scholarship in China with Nadoumi."
      image="/images/student.jpg"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-slate-50 border border-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-900 shadow-sm">
                  {step.number}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="/login" className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm">
            Start Your Application Today
          </a>
        </div>
      </div>
    </GuideLayout>
  );
}
