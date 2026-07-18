import type { Application } from "@/types";

type InterviewDetails = NonNullable<Application["interviewDetails"]>;

export function InterviewDetailsSection({ interviewDetails }: { interviewDetails: InterviewDetails }) {
  return (
    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-3">
      <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">
        Scheduled Interview Parameters
      </span>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
        <div>
          <span className="text-gray-400 block">Date</span>
          <span className="font-semibold text-gray-900">
            {interviewDetails.date ? new Date(interviewDetails.date).toLocaleDateString() : "TBD"}
          </span>
        </div>
        <div>
          <span className="text-gray-400 block">Time</span>
          <span className="font-semibold text-gray-900">{interviewDetails.time || "TBD"}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-400 block">Platform</span>
          <span className="font-semibold text-gray-900">{interviewDetails.videoCallPlatform || "Online"}</span>
        </div>
        {interviewDetails.videoCallLink && (
          <div className="col-span-2">
            <span className="text-gray-400 block">Meeting URL</span>
            <a
              href={interviewDetails.videoCallLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-600 hover:text-orange-500 break-all"
            >
              {interviewDetails.videoCallLink}
            </a>
          </div>
        )}
        {interviewDetails.notes && (
          <div className="col-span-2 border-t border-orange-100 pt-2">
            <span className="text-gray-400 block">Candidate Guidelines</span>
            <p className="text-gray-700 leading-relaxed italic mt-0.5">{interviewDetails.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
