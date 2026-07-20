"use client";

import React, { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getScholarships } from "@/services/scholarshipService";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import PageShell from "@/components/layout/PageShell";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import type { ProgramCategory, ScholarshipCategory } from "@/types";

import { PROGRAM_LEVEL_OPTIONS, SCHOLARSHIP_CATEGORY_OPTIONS as GLOBAL_SCHOLARSHIP_OPTIONS } from "@/data/optionsData";

const PROGRAM_LEVEL_FILTER_OPTIONS = [
  { value: "", label: "All Levels" },
  { value: "Language", label: "Language" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
];

const SCHOLARSHIP_CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "CSC", label: "CSC" },
  { value: "Province", label: "Province" },
  { value: "Universities", label: "Universities" },
  { value: "Self_funded", label: "Self Funded" },
  { value: "Partial", label: "Partial" },
  { value: "HSK", label: "HSK" },
  { value: "Type_A", label: "Type A" },
  { value: "Type_B", label: "Type B" },
  { value: "Type_C", label: "Type C" },
  { value: "Other", label: "Other" },
];

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState(initialSearch);
  const [programCategory, setProgramCategory] = useState<ProgramCategory | "">("");
  const [category, setCategory] = useState<ScholarshipCategory | "">("");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["scholarships", page, limit, search, programCategory, category],
    queryFn: () => getScholarships({
      page,
      limit,
      search,
      programCategory: programCategory || undefined,
      scholarshipCategory: category || undefined
    }),
  });

  return (
    <PageShell
      title="Scholarships"
      description="Find fully-funded and partial scholarships to support your educational journey in China."
      mainClassName="bg-gray-50 min-h-screen"
    >
      <div className="space-y-8">
        <FilterBar
          searchValue={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          searchPlaceholder="Search scholarships..."
          filters={[
            {
              key: "programLevel",
              label: "Program Level",
              options: PROGRAM_LEVEL_FILTER_OPTIONS,
              value: programCategory,
              onChange: (val) => {
                setProgramCategory(val as ProgramCategory | "");
                setPage(1);
              },
            },
            {
              key: "scholarshipCategory",
              label: "Scholarship Category",
              options: SCHOLARSHIP_CATEGORY_FILTER_OPTIONS,
              value: category,
              onChange: (val) => {
                setCategory(val as ScholarshipCategory | "");
                setPage(1);
              },
            },
          ]}
          onClear={() => {
            setSearch("");
            setCategory("");
            setProgramCategory("");
            setPage(1);
          }}
        />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 h-[400px]" />
            ))}
          </div>
        )}

        {error && (
          <ErrorState
            title="We couldn't load scholarships"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        )}

        {!isLoading && !error && data?.scholarships.length === 0 && (
          <EmptyState
            title="No scholarships found"
            description="Try adjusting your search or filters."
          />
        )}

        {!isLoading && !error && data?.scholarships && data.scholarships.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.scholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              totalItems={data.total}
              itemsPerPage={limit}
              pageSizeOptions={[10, 20, 30]}
              onPageChange={setPage}
              onItemsPerPageChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              className="bg-white rounded-2xl border border-gray-100"
            />
          </>
        )}
      </div>
    </PageShell>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 text-center text-gray-900">Loading...</div>}>
      <ScholarshipsContent />
    </Suspense>
  );
}
