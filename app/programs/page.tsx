"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "@/services/programService";
import { ProgramCard } from "@/features/programs/components/ProgramCard";
import PageShell from "@/components/layout/PageShell";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import type { ProgramCategory } from "@/types";

import { PROGRAM_LEVEL_OPTIONS } from "@/data/optionsData";

const CATEGORY_OPTIONS = [
  { value: "", label: "All Levels" },
  ...PROGRAM_LEVEL_OPTIONS.map((opt) => ({ value: opt.value, label: opt.value })),
];

export default function ProgramsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProgramCategory | "">("");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["programs", page, limit, search, category],
    queryFn: () =>
      getPrograms({
        page,
        limit,
        search: search || undefined,
        category: category || undefined,
      }),
  });

  const programs = data?.programs ?? [];
  const pagination = data?.pagination;

  return (
    <PageShell
      title="Programs"
      description="Browse specific degree programs, majors, and funding tracks offered under our partner scholarships."
      mainClassName="bg-gray-50 min-h-screen"
    >
      <div className="space-y-8">
        <FilterBar
          searchValue={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          searchPlaceholder="Search programs, majors, or fields..."
          filters={[
            {
              key: "category",
              label: "Program Level",
              options: CATEGORY_OPTIONS,
              value: category,
              onChange: (val) => {
                setCategory(val as ProgramCategory | "");
                setPage(1);
              },
            },
          ]}
          onClear={() => {
            setSearch("");
            setCategory("");
            setPage(1);
          }}
        />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 h-[380px]" />
            ))}
          </div>
        )}

        {error && (
          <ErrorState title="We couldn't load programs" onRetry={() => refetch()} isRetrying={isRefetching} />
        )}

        {!isLoading && !error && programs.length === 0 && (
          <EmptyState
            title="No programs found"
            description="Try adjusting your search or level filter."
          />
        )}

        {!isLoading && !error && programs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>

            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                itemsPerPage={limit}
                pageSizeOptions={[10, 20, 30]}
                onPageChange={setPage}
                onItemsPerPageChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
                className="bg-white rounded-2xl border border-gray-100"
              />
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}
