import {
  CreditCard,
  ClipboardCheck,
  Building2,
  Award,
  Wallet,
  ScrollText,
  PackageCheck,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import type { ApplicationStep } from "@/data/applicationSteps";

const ICONS: Record<ApplicationStep["icon"], LucideIcon> = {
  CreditCard,
  ClipboardCheck,
  Building2,
  Award,
  Wallet,
  ScrollText,
  PackageCheck,
  PartyPopper,
};

interface ProcessStepsProps {
  steps: ApplicationStep[];
  variant: "dark" | "light";
}

export function ProcessSteps({ steps, variant }: ProcessStepsProps) {
  if (variant === "light") {
    return (
      <div className="space-y-12">
        {steps.map((step) => {
          const Icon = ICONS[step.icon];
          return (
            <div key={step.number} className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-slate-50 border border-gray-200 rounded-full flex items-center justify-center text-orange-600 shadow-sm">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex-grow">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Step {step.number}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => {
        const Icon = ICONS[step.icon];
        return (
          <div
            key={step.number}
            className="relative bg-slate-950/60 border border-slate-800 rounded-2xl p-6 hover:border-orange-600/50 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading text-2xl font-black text-orange-500">{step.number}</span>
              <div className="w-10 h-10 rounded-full bg-orange-600/10 border border-orange-600/30 flex items-center justify-center text-orange-400">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <h3 className="text-base font-bold font-heading text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.summary}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ProcessSteps;
