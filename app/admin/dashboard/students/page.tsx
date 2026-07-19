"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminStudents, useCreateChat } from "@/features/students/hooks/useAdminStudents";
import { getAdminStudentColumns, StudentData } from "@/features/students/components/AdminStudentColumns";
import { StudentProfileModal } from "@/features/students/components/StudentProfileModal";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";

export default function AdminStudentsPage() {
  const router = useRouter();
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const { data, isLoading, error, refetch, isRefetching } = useAdminStudents(currentPage, itemsPerPage);
  const chatMutation = useCreateChat();

  const handleStartChat = () => {
    if (!selectedStudent) return;
    chatMutation.mutate(selectedStudent.id, {
      onSuccess: (conversation) => {
        router.push(`/admin/dashboard/messages?select=${conversation.id}`);
      },
    });
  };

  const columns = useMemo(() => getAdminStudentColumns({ onOpenProfile: setSelectedStudent }), []);

  const students = data?.students || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Student Registry</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review credentials, passports, and contact configurations for registered scholars.
        </p>
      </div>

      {error ? (
        <ErrorState
          title="We couldn't load the student registry"
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : (
        <Card className="p-0 overflow-hidden flex flex-col justify-between">
          {isLoading ? (
            <Loading variant="page" text="Loading students..." className="min-h-[20rem]" />
          ) : students.length === 0 ? (
            <EmptyState
              title="No registered students found"
              description="Students will appear here once they create an account."
            />
          ) : (
            <>
              <DataTable columns={columns} data={students} />
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
      )}

      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onStartChat={handleStartChat}
        isStartingChat={chatMutation.isPending}
      />
    </div>
  );
}
