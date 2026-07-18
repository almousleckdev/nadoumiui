"use client";

import React, { useState } from 'react';
import GuideLayout from '../guides/components/GuideLayout';
import { ChevronDown } from "lucide-react";

import { faqs } from '@/data/faqs';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <GuideLayout 
      title="Frequently Asked Questions"
      subtitle="Find clear, direct answers to common questions about studying, living, and applying through Nadoumi."
      image="/images/login-hero.png"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.q}
                  </h3>
                </div>
                <div className="ml-6 text-gray-400">
                  <ChevronDown className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {isOpen && (
                <div className="px-6 pb-6 pt-2">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-12 bg-slate-50 border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our admission consultants are ready to assist you.</p>
          <a href="/contact" className="inline-block bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            Contact Support
          </a>
        </div>

      </div>
    </GuideLayout>
  );
}
