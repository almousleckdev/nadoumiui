"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useAdminApplications";
import type { Application, ApplicationStatus } from "@/types";
import toast from "react-hot-toast";
import { InterviewDetailsFields } from "./status-fields/InterviewDetailsFields";
import { RejectionDetailsFields } from "./status-fields/RejectionDetailsFields";
import { RevocationDetailsFields } from "./status-fields/RevocationDetailsFields";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "received", label: "Received" },
  { value: "under_review", label: "Under Review" },
  { value: "interview", label: "Interview Scheduled" },
  { value: "interview_passed", label: "Interview Passed" },
  { value: "interview_failed", label: "Interview Failed" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "revoked", label: "Revoked" },
  { value: "waitlisted", label: "Waitlisted" },
];

interface AdminUpdateStatusModalProps {
  application: Application;
  onClose: () => void;
}

export function AdminUpdateStatusModal({ application, onClose }: AdminUpdateStatusModalProps) {
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [adminNote, setAdminNote] = useState<string>("");

  // Metadata states
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("");
  const [videoCallPlatform, setVideoCallPlatform] = useState<string>("");
  const [videoCallLink, setVideoCallLink] = useState<string>("");
  const [interviewNotes, setInterviewNotes] = useState<string>("");

  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [rejectionFeedback, setRejectionFeedback] = useState<string>("");

  const [revocationReason, setRevocationReason] = useState<string>("");
  const [revocationDetails, setRevocationDetails] = useState<string>("");

  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as ApplicationStatus);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const metadata: Record<string, string | null> = {};

    if (status === "interview") {
      metadata.interviewDate = interviewDate || null;
      metadata.interviewTime = interviewTime || null;
      metadata.videoCallPlatform = videoCallPlatform || null;
      metadata.videoCallLink = videoCallLink || null;
      metadata.interviewNotes = interviewNotes || null;
    } else if (status === "rejected") {
      metadata.rejectionReason = rejectionReason || null;
      metadata.rejectionFeedback = rejectionFeedback || null;
    } else if (status === "revoked") {
      metadata.revocationReason = revocationReason || null;
      metadata.revocationDetails = revocationDetails || null;
    }

    if (adminNote.trim()) {
      metadata.adminNote = adminNote.trim();
    }

    updateStatus(
      { id: application.id, status, metadata },
      {
        onSuccess: () => {
          toast.success("Application status updated successfully");
          onClose();
        },
        onError: (err: unknown) => {
          const errorMsg = err instanceof Error ? err.message : "Failed to update status";
          toast.error(errorMsg);
        },
      },
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Update Application Status" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Applicant</h4>
          <p className="text-base font-bold text-gray-900 mt-1">
            {application.student
              ? `${application.student.firstName} ${application.student.lastName}`
              : "Unknown Student"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{application.scholarship?.title || "Unknown Scholarship"}</p>
        </div>

        <Select
          label="New Status"
          value={status}
          onChange={handleStatusChange}
          options={STATUS_OPTIONS}
          className="bg-white border-gray-300 text-gray-900"
        />

        {status === "interview" && (
          <InterviewDetailsFields
            interviewDate={interviewDate}
            onInterviewDateChange={setInterviewDate}
            interviewTime={interviewTime}
            onInterviewTimeChange={setInterviewTime}
            videoCallPlatform={videoCallPlatform}
            onVideoCallPlatformChange={setVideoCallPlatform}
            videoCallLink={videoCallLink}
            onVideoCallLinkChange={setVideoCallLink}
            interviewNotes={interviewNotes}
            onInterviewNotesChange={setInterviewNotes}
          />
        )}

        {status === "rejected" && (
          <RejectionDetailsFields
            rejectionReason={rejectionReason}
            onRejectionReasonChange={setRejectionReason}
            rejectionFeedback={rejectionFeedback}
            onRejectionFeedbackChange={setRejectionFeedback}
          />
        )}

        {status === "revoked" && (
          <RevocationDetailsFields
            revocationReason={revocationReason}
            onRevocationReasonChange={setRevocationReason}
            revocationDetails={revocationDetails}
            onRevocationDetailsChange={setRevocationDetails}
          />
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            General Note (Will be saved to audit history log)
          </label>
          <textarea
            placeholder="Add general remarks..."
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows={2}
            className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AdminUpdateStatusModal;
