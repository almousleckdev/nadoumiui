"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import type { Application } from "@/types";
import { AdmissionDocumentsSection } from "./application-details/AdmissionDocumentsSection";
import { InterviewDetailsSection } from "./application-details/InterviewDetailsSection";
import { RejectionDetailsSection } from "./application-details/RejectionDetailsSection";
import { ApplicationStatusTimeline } from "./application-details/ApplicationStatusTimeline";

interface ApplicationDetailsModalProps {
  application: Application | null;
  onClose: () => void;
}

export function ApplicationDetailsModal({ application, onClose }: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <Modal isOpen={Boolean(application)} onClose={onClose} title="Application Details & Documents" size="md">
      <div className="space-y-6 max-h-[85vh] overflow-y-auto pr-1">
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Program Title</span>
          <span className="text-base font-bold text-gray-900 leading-tight block mt-0.5">
            {application.scholarship?.title || "Chinese Government Scholarship"}
          </span>
          {application.scholarship?.universities?.[0] && (
            <span className="text-xs font-semibold text-gray-500 block mt-0.5">
              {application.scholarship.universities[0].name}
            </span>
          )}
          <span className="text-[10px] text-gray-400 font-mono block mt-1">
            Application ID: {application.applicationId}
          </span>
        </div>

        {application.status === "accepted" && <AdmissionDocumentsSection application={application} />}

        {application.status === "interview" && application.interviewDetails && (
          <InterviewDetailsSection interviewDetails={application.interviewDetails} />
        )}

        {application.status === "rejected" && application.rejectionDetails && (
          <RejectionDetailsSection rejectionDetails={application.rejectionDetails} />
        )}

        <div className="space-y-4">
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
            Application Status Timeline
          </span>
          <ApplicationStatusTimeline statusHistory={application.statusHistory} />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button variant="primary" onClick={onClose}>
            Close Details
          </Button>
        </div>
      </div>
    </Modal>
  );
}
