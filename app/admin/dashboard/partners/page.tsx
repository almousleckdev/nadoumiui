"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAdminPartners, useDeletePartner } from "@/features/partners/hooks/useAdminPartners";
import { getAdminPartnerColumns } from "@/features/partners/components/AdminPartnerColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";

export default function AdminPartnersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);

  const {
    data: responseData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useAdminPartners(currentPage, itemsPerPage);

  const deleteMutation = useDeletePartner();

  const handleDeleteTrigger = (id: string) => {
    setPartnerToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (partnerToDelete) {
      deleteMutation.mutate(partnerToDelete, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setPartnerToDelete(null);
        },
      });
    }
  };

  const columns = useMemo(() => getAdminPartnerColumns({ onDelete: handleDeleteTrigger }), []);

  const partners = responseData?.partners || [];
  const totalPages = responseData?.totalPages || 1;
  const totalItems = responseData?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">Partner Universities</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the institutions showcased on the public Partners page.
          </p>
        </div>
        <Link href="/admin/dashboard/partners/new">
          <Button variant="primary">Add Partner</Button>
        </Link>
      </div>

      {error ? (
        <ErrorState
          title="We couldn't load the partners list"
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : (
        <Card className="p-0 overflow-hidden flex flex-col justify-between">
          {isLoading ? (
            <Loading variant="page" text="Loading partners..." className="min-h-[20rem]" />
          ) : partners.length === 0 ? (
            <EmptyState
              title="No partners added yet"
              description='Click "Add Partner" to feature your first institution.'
            />
          ) : (
            <>
              <DataTable columns={columns} data={partners} />

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

      {/* Confirmation delete modal */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setPartnerToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Partner"
        message="Are you sure you want to permanently remove this partner from the showcase? This action cannot be undone."
        confirmText="Yes, Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
