"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAdminApplications } from "@/features/applications/hooks/useAdminApplications";
import { getAdminApplicationColumns } from "@/features/applications/components/AdminApplicationColumns";
import { AdminUpdateStatusModal } from "@/features/applications/components/AdminUpdateStatusModal";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import type { Application, ApplicationStatus } from "@/types";

export default function AdminApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filters = {
    page: currentPage,
    limit: itemsPerPage,
    ...(statusFilter ? { status: statusFilter as ApplicationStatus } : {}),
  };

  const { data: responseData, isLoading, error, refetch, isRefetching } = useAdminApplications(filters);

  const columns = useMemo(
    () => getAdminApplicationColumns({ onUpdateStatus: setSelectedApp }),
    []
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "received", label: "Received" },
    { value: "under_review", label: "Under Review" },
    { value: "interview", label: "Interview Scheduled" },
    { value: "interview_passed", label: "Interview Passed" },
    { value: "interview_failed", label: "Interview Failed" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "waitlisted", label: "Waitlisted" },
  ];

  const items = responseData?.applications || [];
  const totalPages = responseData?.totalPages || 1;
  const totalItems = responseData?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Application Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review credentials, schedule interviews, and update scholarship enrollment statuses.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 max-w-xs">
        <div className="w-full">
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            className="bg-white border-gray-200 text-gray-800"
          />
        </div>
      </div>

      {error ? (
        <ErrorState
          title="We couldn't load the applications list"
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : (
        /* Applications Table Card */
        <Card className="p-0 overflow-hidden flex flex-col justify-between">
          {isLoading ? (
            <Loading variant="page" text="Loading applications..." className="min-h-[20rem]" />
          ) : items.length === 0 ? (
            <EmptyState
              title="No applications match this filter"
              description="Try adjusting or clearing the status filter above."
            />
          ) : (
            <>
              <DataTable columns={columns} data={items} />

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

      {selectedApp && (
        <AdminUpdateStatusModal
          key={selectedApp.id}
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
