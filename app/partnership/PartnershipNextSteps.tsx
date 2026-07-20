import { PARTNERSHIP_NEXT_STEPS } from "@/data/partnershipData";

export function PartnershipNextSteps() {
  return (
    <div className="lg:sticky lg:top-32 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-6">What happens next</h3>
        <div className="space-y-6">
          {PARTNERSHIP_NEXT_STEPS.map(({ icon: Icon, title, description }, idx) => (
            <div key={title} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                {idx < PARTNERSHIP_NEXT_STEPS.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
              </div>
              <div className="pb-2">
                <h4 className="font-bold text-gray-900 text-sm leading-tight">{title}</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6">
        <p className="text-sm text-gray-500 mb-1">Prefer to reach us directly?</p>
        <a
          href="mailto:team@nadoumiconsulting.com"
          className="font-semibold text-orange-600 hover:text-orange-700 break-all"
        >
          team@nadoumiconsulting.com
        </a>
      </div>
    </div>
  );
}

export default PartnershipNextSteps;
