interface RejectionDetailsFieldsProps {
  rejectionReason: string;
  onRejectionReasonChange: (value: string) => void;
  rejectionFeedback: string;
  onRejectionFeedbackChange: (value: string) => void;
}

export function RejectionDetailsFields({
  rejectionReason,
  onRejectionReasonChange,
  rejectionFeedback,
  onRejectionFeedbackChange,
}: RejectionDetailsFieldsProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-4">
      <h5 className="text-xs font-bold text-red-800 uppercase tracking-wider">Rejection Details</h5>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Reason Code</label>
        <input
          type="text"
          placeholder="e.g. academic_requirements_not_met"
          value={rejectionReason}
          onChange={(e) => onRejectionReasonChange(e.target.value)}
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Feedback for Student</label>
        <textarea
          placeholder="Detailed reason for rejection..."
          value={rejectionFeedback}
          onChange={(e) => onRejectionFeedbackChange(e.target.value)}
          rows={3}
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
        />
      </div>
    </div>
  );
}
