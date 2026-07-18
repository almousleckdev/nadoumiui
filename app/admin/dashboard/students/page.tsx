"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminStudents, useCreateChat } from "@/features/students/hooks/useAdminStudents";
import { getAdminStudentColumns, StudentData } from "@/features/students/components/AdminStudentColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";

export default function AdminStudentsPage() {
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const { data, isLoading, error } = useAdminStudents(currentPage, itemsPerPage);
  const chatMutation = useCreateChat();

  const handleOpenProfile = (student: StudentData) => {
    setSelectedStudent(student);
  };

  const handleCloseProfile = () => {
    setSelectedStudent(null);
  };

  const handleStartChat = () => {
    if (!selectedStudent) return;
    chatMutation.mutate(selectedStudent.id, {
      onSuccess: (conversation) => {
        router.push(`/admin/dashboard/messages?select=${conversation.id}`);
      }
    });
  };

  const columns = useMemo(
    () => getAdminStudentColumns({ onOpenProfile: handleOpenProfile }),
    []
  );

  const students = data?.students || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Student Registry
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review credentials, passports, and contact configurations for registered scholars.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-medium">
          Error loading student databases. Verify backend parameters.
        </div>
      )}

      {/* Main Registry Card */}
      <Card className="p-0 overflow-hidden flex flex-col justify-between">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
            Loading student registry records...
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            No registered students found in the database.
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={students} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(newLimit) => {
                setItemsPerPage(newLimit);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </Card>

      {/* Profile Info Modal */}
      <Modal
        isOpen={Boolean(selectedStudent)}
        onClose={handleCloseProfile}
        title="Student Profile Details"
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-orange-950/30 border border-orange-900/50 text-orange-500 flex items-center justify-center font-bold text-xl font-heading shrink-0">
                {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 font-heading truncate">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h3>
                <p className="text-sm text-gray-500 truncate">{selectedStudent.email}</p>
                <span className="text-[10px] text-gray-400 font-mono block truncate mt-0.5">UUID: {selectedStudent.id}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm border-b border-gray-200 pb-6">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Citizenship</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">{selectedStudent.country}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Passport Number</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block font-mono">
                  {selectedStudent.passportNumber || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Phone Number</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">{selectedStudent.phone || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Date of Birth</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">
                  {selectedStudent.dateOfBirth ? new Date(selectedStudent.dateOfBirth).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Gender</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">{selectedStudent.gender || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Registered Date</span>
                <span className="text-sm font-semibold text-gray-800 mt-1 block">
                  {new Date(selectedStudent.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Applications List Section */}
            <div className="space-y-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Submitted Applications</span>
              {!selectedStudent.applications || selectedStudent.applications.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No applications submitted by this student yet.</p>
              ) : (
                <div className="space-y-2">
                  {selectedStudent.applications.map((app) => (
                    <div key={app.id} className="p-3 bg-white/50 border border-gray-200 rounded-lg flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-gray-900 block truncate leading-tight">
                          {app.scholarship?.title || "Unknown Scholarship"}
                        </span>
                        <div className="flex flex-col mt-1 space-y-0.5">
                          <span className="text-[10px] text-gray-500 font-mono block truncate">
                            App ID: {app.applicationId}
                          </span>
                          <span className="text-[10px] text-gray-500 block truncate">
                            <span className="font-semibold text-gray-700">Type:</span> {app.scholarship?.type || "N/A"}
                          </span>
                          <span className="text-[10px] text-gray-500 block truncate">
                            <span className="font-semibold text-gray-700">University:</span> {app.scholarship?.universities?.[0]?.name || "N/A"}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          app.status === "accepted"
                            ? "success"
                            : app.status === "rejected" || app.status === "revoked"
                              ? "danger"
                              : "warning"
                        }
                        className="shrink-0"
                      >
                        {app.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleStartChat}
                isLoading={chatMutation.isPending}
                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
              >
                Message Student
              </Button>
              <Button variant="primary" onClick={handleCloseProfile}>
                Close Details
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
