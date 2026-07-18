"use client";

import React from "react";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Application } from "@/types";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

interface ApplicationDetailsModalProps {
  application: Application | null;
  onClose: () => void;
}

export function ApplicationDetailsModal({
  application,
  onClose,
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <Modal
      isOpen={Boolean(application)}
      onClose={onClose}
      title="Application Details & Documents"
      size="md"
    >
      <div className="space-y-6 max-h-[85vh] overflow-y-auto pr-1">
        {/* Header info */}
        <div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
            Program Title
          </span>
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

        {/* Conditionally render Admission Documents */}
        {application.status === "accepted" && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Official Admission Documents
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Admission Letter */}
              <div className="bg-white p-3 rounded-lg border border-emerald-100 flex flex-col justify-between gap-2 shadow-sm">
                <span className="font-bold text-gray-700">
                  Admission Letter
                </span>
                {application.admissionDocument?.path ? (
                  <a
                    href={resolveDocumentUrl(
                      application.admissionDocument.path
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-emerald-600 font-semibold hover:text-emerald-500"
                  >
                    Download PDF &rarr;
                  </a>
                ) : (
                  <span className="text-gray-400 italic">
                    Being prepared...
                  </span>
                )}
              </div>
              {/* JW202 Form */}
              <div className="bg-white p-3 rounded-lg border border-emerald-100 flex flex-col justify-between gap-2 shadow-sm">
                <span className="font-bold text-gray-700">JW202 Visa Form</span>
                {application.jw202Document?.path ? (
                  <a
                    href={resolveDocumentUrl(application.jw202Document.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-emerald-600 font-semibold hover:text-emerald-500"
                  >
                    Download PDF &rarr;
                  </a>
                ) : (
                  <span className="text-gray-400 italic">
                    Being prepared...
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Conditionally render Interview parameters */}
        {application.status === "interview" && application.interviewDetails && (
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">
              Scheduled Interview Parameters
            </span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-gray-400 block">Date</span>
                <span className="font-semibold text-gray-900">
                  {application.interviewDetails.date
                    ? new Date(
                        application.interviewDetails.date
                      ).toLocaleDateString()
                    : "TBD"}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Time</span>
                <span className="font-semibold text-gray-900">
                  {application.interviewDetails.time || "TBD"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400 block">Platform</span>
                <span className="font-semibold text-gray-900">
                  {application.interviewDetails.videoCallPlatform || "Online"}
                </span>
              </div>
              {application.interviewDetails.videoCallLink && (
                <div className="col-span-2">
                  <span className="text-gray-400 block">Meeting URL</span>
                  <a
                    href={application.interviewDetails.videoCallLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-orange-600 hover:text-orange-500 break-all"
                  >
                    {application.interviewDetails.videoCallLink}
                  </a>
                </div>
              )}
              {application.interviewDetails.notes && (
                <div className="col-span-2 border-t border-orange-100 pt-2">
                  <span className="text-gray-400 block">
                    Candidate Guidelines
                  </span>
                  <p className="text-gray-700 leading-relaxed italic mt-0.5">
                    {application.interviewDetails.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logs Timeline */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
            Application Status Timeline
          </span>
          {Array.isArray(application.statusHistory) &&
          application.statusHistory.length > 0 ? (
            <div className="relative border-l border-gray-200 pl-4 ml-2 space-y-5 py-1">
              {application.statusHistory.map((log, index) => {
                const logDate = new Date(log.timestamp).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                return (
                  <div key={index} className="relative">
                    {/* Dot indicator */}
                    <div className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          size="sm"
                          variant={
                            log.status === "accepted"
                              ? "success"
                              : log.status === "rejected"
                              ? "danger"
                              : "info"
                          }
                        >
                          {log.status.replace("_", " ")}
                        </Badge>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {logDate}
                        </span>
                      </div>
                      {log.note && (
                        <p className="text-xs text-gray-500 mt-1 pl-1 italic">
                          &ldquo;{log.note}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              No timeline recorded for this application.
            </p>
          )}
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
