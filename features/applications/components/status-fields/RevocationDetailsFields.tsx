interface RevocationDetailsFieldsProps {
  revocationReason: string;
  onRevocationReasonChange: (value: string) => void;
  revocationDetails: string;
  onRevocationDetailsChange: (value: string) => void;
}

export function RevocationDetailsFields({
  revocationReason,
  onRevocationReasonChange,
  revocationDetails,
  onRevocationDetailsChange,
}: RevocationDetailsFieldsProps) {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
      <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Revocation Details</h5>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Reason Summary</label>
        <input
          type="text"
          placeholder="e.g. document_forgery"
          value={revocationReason}
          onChange={(e) => onRevocationReasonChange(e.target.value)}
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Revocation Details</label>
        <textarea
          placeholder="Add audit details..."
          value={revocationDetails}
          onChange={(e) => onRevocationDetailsChange(e.target.value)}
          rows={3}
          className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
        />
      </div>
    </div>
  );
}
