"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/services/universityService";
import { UniversityCard } from "@/features/universities/components/UniversityCard";
import PageShell from "@/components/layout/PageShell";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import type { UniversityType } from "@/types";

import { PROVINCE_OPTIONS, UNIVERSITY_TYPE_OPTIONS } from "@/data/optionsData";

const PROVINCE_FILTER_OPTIONS = [
  { value: "", label: "All Locations" },
  ...PROVINCE_OPTIONS,
];

const TYPE_FILTER_OPTIONS = [
  { value: "", label: "All Types" },
  ...UNIVERSITY_TYPE_OPTIONS,
];

export default function UniversitiesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [type, setType] = useState<UniversityType | "">("");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["universities", page, limit, search, province, type],
    queryFn: () => getUniversities({ page, limit, search, province, type: type || undefined }),
  });

  return (
    <PageShell
      title="Study in China"
      description="Discover top-ranked Chinese universities, explore world-class programs, and find your next academic destination."
      mainClassName="bg-gray-50 min-h-screen"
    >
      <div className="space-y-8">
        <FilterBar
          searchValue={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          searchPlaceholder="Search universities..."
          filters={[
            {
              key: "province",
              label: "Province",
              options: PROVINCE_FILTER_OPTIONS,
              value: province,
              onChange: (val) => {
                setProvince(val);
                setPage(1);
              },
            },
            {
              key: "type",
              label: "Type",
              options: TYPE_FILTER_OPTIONS,
              value: type,
              onChange: (val) => {
                setType(val as UniversityType | "");
                setPage(1);
              },
            },
          ]}
          onClear={() => {
            setSearch("");
            setProvince("");
            setType("");
            setPage(1);
          }}
        />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 h-[400px]"
              />
            ))}
          </div>
        )}

        {error && (
          <ErrorState
            title="We couldn't load universities"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        )}

        {!isLoading && !error && data?.universities.length === 0 && (
          <EmptyState
            title="No universities found"
            description="Try adjusting your search or filters."
          />
        )}

        {!isLoading && !error && data?.universities && data.universities.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.universities.map((university) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                />
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
