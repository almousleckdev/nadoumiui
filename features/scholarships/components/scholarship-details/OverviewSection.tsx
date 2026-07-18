import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Scholarship } from "@/types";
import { renderJsonField } from "./jsonFieldRenderers";

export function OverviewSection({ scholarship }: { scholarship: Scholarship }) {
  return (
    <section className="pb-8 border-b border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <InformationCircleIcon className="w-7 h-7 text-orange-600" />
        Scholarship Overview
      </h2>
      <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
        {scholarship.description}
      </div>

      {Boolean(scholarship.benefits) && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
          <div className="text-gray-600">{renderJsonField(scholarship.benefits)}</div>
        </div>
      )}
    </section>
  );
}
