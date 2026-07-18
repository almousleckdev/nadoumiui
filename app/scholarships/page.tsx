"use client";

import React, { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getScholarships } from "@/services/scholarshipService";
import { ScholarshipCard } from "@/features/scholarships/components/ScholarshipCard";
import { ScholarshipFilters } from "@/features/scholarships/components/ScholarshipFilters";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";
import type { ProgramCategory, ScholarshipCategory } from "@/types";

function ScholarshipsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [programCategory, setProgramCategory] = useState<ProgramCategory | "">("");
  const [category, setCategory] = useState<ScholarshipCategory | "">("");
  const limit = 12;

  const { data, isLoading, error } = useQuery({
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
    <>
      <Navbar />
      <main className="flex-grow pb-20 bg-gray-50 min-h-screen">
        <PageHero 
          title="Scholarships" 
          description="Find fully-funded and partial scholarships to support your educational journey in China." 
          imageSrc="/images/team.jpg" 
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <ScholarshipFilters
                searchValue={search}
                categoryValue={category}
                programCategoryValue={programCategory}
                onSearchChange={(val) => { setSearch(val); setPage(1); }}
                onCategoryChange={(val) => { setCategory(val as ScholarshipCategory); setPage(1); }}
                onProgramCategoryChange={(val) => { setProgramCategory(val as ProgramCategory); setPage(1); }}
                onClear={() => {
                  setSearch("");
                  setCategory("");
                  setProgramCategory("");
                  setPage(1);
                }}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-100 p-6 h-[400px]" />
                  ))}
                </div>
              )}

              {error && (
                <div className="text-center py-12 rounded-2xl border border-red-150 bg-red-50 text-red-700">
                  <p className="font-semibold">Unable to load scholarships</p>
                  <p className="text-sm mt-1 text-red-500">Please verify your connection.</p>
                </div>
              )}

              {!isLoading && !error && data?.scholarships.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">No scholarships found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters to find what you&apos;re looking for.</p>
                </div>
              )}

              {!isLoading && !error && data?.scholarships && data.scholarships.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.scholarships.map((scholarship) => (
                      <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                    ))}
                  </div>

                  {data.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 text-center text-gray-900">Loading...</div>}>
      <ScholarshipsContent />
    </Suspense>
  );
}
