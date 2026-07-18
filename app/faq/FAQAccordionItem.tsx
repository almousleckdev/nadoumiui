"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordionItem({
  category,
  question,
  answer,
  defaultOpen = false,
}: {
  category: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            {category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        </div>
        <div className="ml-6 text-gray-400">
          <ChevronDown
            aria-hidden="true"
            className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
