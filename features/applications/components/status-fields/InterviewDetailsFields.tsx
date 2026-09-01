import { Input } from "@/components/ui/Input";

interface InterviewDetailsFieldsProps {
  interviewDate: string;
  onInterviewDateChange: (value: string) => void;
  interviewTime: string;
  onInterviewTimeChange: (value: string) => void;
  videoCallPlatform: string;
  onVideoCallPlatformChange: (value: string) => void;
  videoCallLink: string;
  onVideoCallLinkChange: (value: string) => void;
  interviewNotes: string;
  onInterviewNotesChange: (value: string) => void;
}

export function InterviewDetailsFields({
  interviewDate,
  onInterviewDateChange,
  interviewTime,
  onInterviewTimeChange,
  videoCallPlatform,
  onVideoCallPlatformChange,
  videoCallLink,
  onVideoCallLinkChange,
  interviewNotes,
  onInterviewNotesChange,
}: InterviewDetailsFieldsProps) {
  return (
    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-4">
      <h5 className="text-xs font-bold text-orange-800 uppercase tracking-wider">Interview Details</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Interview Date"
          type="date"
          value={interviewDate}
          onChange={(e) => onInterviewDateChange(e.target.value)}
          required
        />
        <Input
          label="Interview Time"
          type="text"
          placeholder="e.g. 14:00 (GMT+8)"
          value={interviewTime}
          onChange={(e) => onInterviewTimeChange(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Platform"
          type="text"
          placeholder="Zoom, Voov, WeChat"
          value={videoCallPlatform}
          onChange={(e) => onVideoCallPlatformChange(e.target.value)}
          required
        />
        <Input
          label="Call Link / Meeting ID"
          type="text"
          placeholder="https://..."
          value={videoCallLink}
          onChange={(e) => onVideoCallLinkChange(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Interview Instructions / Notes</label>
        <textarea
          placeholder="Instructions for the student..."
          value={interviewNotes}
          onChange={(e) => onInterviewNotesChange(e.target.value)}
          rows={3}
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
        />
      </div>
    </div>
  );
}
