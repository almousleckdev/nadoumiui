import type { Application } from "@/types";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

function DocumentCard({ label, path }: { label: string; path?: string }) {
  return (
    <div className="bg-white p-3 rounded-lg border border-emerald-100 flex flex-col justify-between gap-2 shadow-sm">
      <span className="font-bold text-gray-700">{label}</span>
      {path ? (
        <a
          href={resolveDocumentUrl(path)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-emerald-600 font-semibold hover:text-emerald-500"
        >
          Download PDF &rarr;
        </a>
      ) : (
        <span className="text-gray-400 italic">Being prepared...</span>
      )}
    </div>
  );
}

export function AdmissionDocumentsSection({ application }: { application: Application }) {
  return (
    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3">
      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
        Official Admission Documents
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <DocumentCard label="Admission Letter" path={application.admissionDocument?.path} />
        <DocumentCard label="JW202 Visa Form" path={application.jw202Document?.path} />
      </div>
    </div>
  );
}
