"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAdminScholarships, useDeleteScholarship } from "@/features/scholarships/hooks/useAdminScholarships";
import { getAdminScholarshipColumns } from "@/features/scholarships/components/AdminScholarshipColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AdminScholarshipsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Delete Confirmation States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [scholarshipToDelete, setScholarshipToDelete] = useState<string | null>(null);

  const { data: responseData, isLoading, error } = useAdminScholarships(currentPage, itemsPerPage);
  
  const deleteMutation = useDeleteScholarship();

  const handleDeleteTrigger = (id: string) => {
    setScholarshipToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (scholarshipToDelete) {
      deleteMutation.mutate(scholarshipToDelete, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setScholarshipToDelete(null);
        }
      });
    }
  };

  const columns = useMemo(
    () => getAdminScholarshipColumns({ onDelete: handleDeleteTrigger }),
    []
  );

  const scholarships = responseData?.scholarships || [];
  const totalPages = responseData?.totalPages || 1;
  const totalItems = responseData?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
            Scholarship Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Publish and structure programs for international applicants.
          </p>
        </div>
        <Link href="/admin/dashboard/scholarships/new">
          <Button variant="primary">
            Add Scholarship
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-medium">
          Error loading scholarships registry. Ensure databases are active.
        </div>
      )}

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden flex flex-col justify-between">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
            Loading scholarships metadata...
          </div>
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            No scholarships found. Click "Add Scholarship" to begin.
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={scholarships} />

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

      {/* Confirmation delete modal */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setScholarshipToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Scholarship"
        message="Are you sure you want to permanently delete this scholarship? All matching student application linkages will become orphaned. This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
