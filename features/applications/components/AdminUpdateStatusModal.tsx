"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useUpdateApplicationStatus } from "@/features/applications/hooks/useAdminApplications";
import type { Application, ApplicationStatus } from "@/types";
import toast from "react-hot-toast";

interface AdminUpdateStatusModalProps {
  application: Application;
  onClose: () => void;
}

export function AdminUpdateStatusModal({
  application,
  onClose,
}: AdminUpdateStatusModalProps) {
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

    updateStatus(
      {
        id: application.id,
        status,
        metadata,
      },
      {
        onSuccess: () => {
          toast.success("Application status updated successfully");
          onClose();
        },
        onError: (err: unknown) => {
          const errorMsg = err instanceof Error ? err.message : "Failed to update status";
          toast.error(errorMsg);
        },
      }
    );
  };

  const statusOptions = [
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

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Update Application Status"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Applicant
          </h4>
          <p className="text-base font-bold text-gray-900 mt-1">
            {application.student
              ? `${application.student.firstName} ${application.student.lastName}`
              : "Unknown Student"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {application.scholarship?.title || "Unknown Scholarship"}
          </p>
        </div>

        <Select
          label="New Status"
          value={status}
          onChange={handleStatusChange}
          options={statusOptions}
          className="bg-white border-gray-300 text-gray-900"
        />

        {status === "interview" && (
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-orange-800 uppercase tracking-wider">
              Interview Details
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Interview Date
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Interview Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14:00 (GMT+8)"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <input
                  type="text"
                  placeholder="Zoom, Voov, WeChat"
                  value={videoCallPlatform}
                  onChange={(e) => setVideoCallPlatform(e.target.value)}
                  className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Call Link / Meeting ID
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={videoCallLink}
                  onChange={(e) => setVideoCallLink(e.target.value)}
                  className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Interview Instructions / Notes
              </label>
              <textarea
                placeholder="Instructions for the student..."
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                rows={3}
                className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              />
            </div>
          </div>
        )}

        {status === "rejected" && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-red-800 uppercase tracking-wider">
              Rejection Details
            </h5>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Reason Code
              </label>
              <input
                type="text"
                placeholder="e.g. academic_requirements_not_met"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Feedback for Student
              </label>
              <textarea
                placeholder="Detailed reason for rejection..."
                value={rejectionFeedback}
                onChange={(e) => setRejectionFeedback(e.target.value)}
                rows={3}
                className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              />
            </div>
          </div>
        )}

        {status === "revoked" && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Revocation Details
            </h5>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Reason Summary
              </label>
              <input
                type="text"
                placeholder="e.g. document_forgery"
                value={revocationReason}
                onChange={(e) => setRevocationReason(e.target.value)}
                className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Revocation Details
              </label>
              <textarea
                placeholder="Add audit details..."
                value={revocationDetails}
                onChange={(e) => setRevocationDetails(e.target.value)}
                rows={3}
                className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              />
            </div>
          </div>
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
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
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
