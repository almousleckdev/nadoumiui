"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/services/universityService";
import { UniversityCard } from "@/features/universities/components/UniversityCard";
import { UniversityFilters } from "@/features/universities/components/UniversityFilters";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/ui/Pagination";
import { PageHero } from "@/components/ui/PageHero";

export default function UniversitiesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [type, setType] = useState("");
  const limit = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["universities", page, limit, search, province],
    queryFn: () => getUniversities({ page, limit, search, province }),
  });
  
  const filteredUniversities = useMemo(() => {
    if (!data?.universities) return [];
    let list = data.universities;
    if (type) {
      list = list.filter((u) => u.type === type);
    }
    return list;
  }, [data?.universities, type]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pb-20 bg-gray-50 min-h-screen">
        <PageHero 
          title="Study in China" 
          description="Discover top-ranked Chinese universities, explore world-class programs, and find your next academic destination." 
          imageSrc="/images/team.jpg" 
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <UniversityFilters
                searchValue={search}
                provinceValue={province}
                typeValue={type}
                onSearchChange={(val) => {
                  setSearch(val);
                  setPage(1);
                }}
                onProvinceChange={(val) => {
                  setProvince(val);
                  setPage(1);
                }}
                onTypeChange={(val) => {
                  setType(val);
                  setPage(1);
                }}
                onClear={() => {
                  setSearch("");
                  setProvince("");
                  setType("");
                  setPage(1);
                }}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
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
                <div className="text-center py-12 rounded-2xl border border-red-150 bg-red-50 text-red-700">
                  <p className="font-semibold">Unable to load universities</p>
                  <p className="text-sm mt-1 text-red-500">
                    Please verify your connection.
                  </p>
                </div>
              )}

              {!isLoading && !error && filteredUniversities.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No universities found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                </div>
              )}

              {!isLoading && !error && filteredUniversities.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUniversities.map((university) => (
                      <UniversityCard
                        key={university.id}
                        university={university}
                      />
                    ))}
                  </div>

                  {data?.totalPages && data.totalPages > 1 && (
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
