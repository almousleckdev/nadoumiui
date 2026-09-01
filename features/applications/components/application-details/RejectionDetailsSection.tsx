import type { Application } from "@/types";

type RejectionDetails = NonNullable<Application["rejectionDetails"]>;

export function RejectionDetailsSection({ rejectionDetails }: { rejectionDetails: RejectionDetails }) {
  return (
    <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-3">
      <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
        Reason for Rejection
      </span>
      <div className="space-y-3 text-xs">
        {rejectionDetails.reason && (
          <div>
            <span className="text-gray-400 block">Reason</span>
            <span className="font-semibold text-gray-900">{rejectionDetails.reason}</span>
          </div>
        )}
        {rejectionDetails.feedback && (
          <div className="border-t border-red-100 pt-2">
            <span className="text-gray-400 block">Feedback</span>
            <p className="text-gray-700 leading-relaxed italic mt-0.5">{rejectionDetails.feedback}</p>
          </div>
        )}
        {!rejectionDetails.reason && !rejectionDetails.feedback && (
          <p className="text-gray-500 italic">No additional details were provided for this decision.</p>
        )}
        {rejectionDetails.rejectedAt && (
          <div className="border-t border-red-100 pt-2">
            <span className="text-gray-400 block">Decided On</span>
            <span className="font-semibold text-gray-900">
              {new Date(rejectionDetails.rejectedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
