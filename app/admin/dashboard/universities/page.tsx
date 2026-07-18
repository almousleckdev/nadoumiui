"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  useAdminUniversities,
  useDeleteUniversity,
} from "@/features/universities/hooks/useAdminUniversities";
import { getAdminUniversityColumns } from "@/features/universities/components/AdminUniversityColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

export default function AdminUniversitiesPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Delete Confirmation States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState<string | null>(
    null,
  );

  const {
    data: responseData,
    isLoading,
    error,
  } = useAdminUniversities(currentPage, itemsPerPage);

  const deleteMutation = useDeleteUniversity();

  const handleDeleteTrigger = (id: string) => {
    setUniversityToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (universityToDelete) {
      deleteMutation.mutate(universityToDelete, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setUniversityToDelete(null);
        },
      });
    }
  };

  const columns = useMemo(
    () => getAdminUniversityColumns({ onDelete: handleDeleteTrigger }),
    [],
  );

  const universities = responseData?.universities || [];
  const totalPages = responseData?.totalPages || 1;
  const totalItems = responseData?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
            University Directory
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage partner universities and customize campus details.
          </p>
        </div>
        <Link href="/admin/dashboard/universities/new">
          <Button variant="primary">Add University</Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-medium">
          Error loading universities list. Please verify backend state.
        </div>
      )}

      {/* Main Table Card */}
      <Card className="p-0 overflow-hidden flex flex-col justify-between">
        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
            Loading partner universities...
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            No universities onboarded. Click "Add University" to begin.
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={universities} />

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
          setUniversityToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete University"
        message="Are you sure you want to permanently delete this university from the registry? Associated scholarships may lose their university links. This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
