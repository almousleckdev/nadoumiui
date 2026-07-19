import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import FAQAccordionItem from "./FAQAccordionItem";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Nadoumi",
  description:
    "Find clear, direct answers to common questions about studying, living, and applying through Nadoumi.",
};

export default function FAQPage() {
  return (
    <PageShell
      title="Frequently Asked Questions"
      description="Find clear, direct answers to common questions about studying, living, and applying through Nadoumi."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <FAQAccordionItem
            key={idx}
            category={faq.category}
            question={faq.q}
            answer={faq.a}
            defaultOpen={idx === 0}
          />
        ))}

        <div className="mt-12 bg-slate-50 border border-gray-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our admission consultants are ready to assist you.</p>
          <a
            href="/contact"
            className="inline-block bg-white border border-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Contact Support
          </a>
        </div>
      </div>
    </PageShell>
  );
}
