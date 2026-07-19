import React from 'react';
import PageShell from '@/components/layout/PageShell';
import ProcessSteps from '@/features/home/components/ProcessSteps';
import { applicationSteps } from '@/data/applicationSteps';

export default function HowToApplyPage() {
  return (
    <PageShell
      title="How to Apply"
      description="A clear, step-by-step roadmap to securing your admission and scholarship in China with Nadoumi."
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-14 text-center">
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Applying to study in China involves more paperwork and more parties — your chosen university,
            the Chinese Scholarship Council in some cases, and the visa office — than a typical domestic
            application. Nadoumi exists to carry you through every one of those handoffs so nothing gets
            lost in translation, literally or otherwise. Below is exactly what happens, in order, from the
            moment you commit to a program to the day you board your flight.
          </p>
        </div>

        <ProcessSteps steps={applicationSteps} variant="light" />

        <div className="mt-16 text-center">
          <a href="/login" className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-sm">
            Start Your Application Today
          </a>
        </div>
      </div>
    </PageShell>
  );
}
