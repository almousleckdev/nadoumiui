"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useStudentApplications } from "@/features/applications/hooks/useStudentApplications";
import { ApplicationDetailsModal } from "@/features/applications/components/ApplicationDetailsModal";
import { getStudentApplicationColumns } from "@/features/applications/components/StudentApplicationColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import { Loading } from "@/components/ui/Loading";
import type { Application } from "@/types";
import { FileText } from "lucide-react";

export default function StudentApplicationsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data: applications = [], isLoading, error, refetch, isRefetching } = useStudentApplications();

  // Columns for TanStack Table
  const columns = useMemo(
    () => getStudentApplicationColumns({ onViewDetails: setSelectedApp }),
    []
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Loading variant="skeleton" className="h-10 rounded-lg w-1/4" />
        <Loading variant="skeleton" className="h-96 rounded-xl" />
      </div>
    );
  }

  // Client-side pagination logic (will be refactored to server-side soon)
  const itemsPerPage = 8;
  const totalItems = applications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedApps = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
            My Applications
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review and track details for all your submitted scholarship applications.
          </p>
        </div>
        <Link href="/scholarships">
          <Button variant="primary">New Application</Button>
        </Link>
      </div>

      {error ? (
        <ErrorState
          title="We couldn't load your applications"
          onRetry={() => refetch()}
          isRetrying={isRefetching}
        />
      ) : (
        <Card className="p-0 overflow-hidden border border-gray-200 flex flex-col justify-between">
          {totalItems === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4 border border-gray-100">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 font-heading">No applications submitted yet</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Find fully-funded Chinese university programs and start your application today.
              </p>
              <Link href="/scholarships" className="mt-5 inline-block">
                <Button size="md">Browse Programs</Button>
              </Link>
            </div>
          ) : (
            <>
              <DataTable columns={columns} data={paginatedApps} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="dark:border-gray-200"
              />
            </>
          )}
        </Card>
      )}

      <ApplicationDetailsModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
      />
    </div>
  );
}
