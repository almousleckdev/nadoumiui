"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import CityImage from "./CityImage";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { provinceCityGuides, type CityEntry } from "@/data/cityGuides";

interface FlatCity extends CityEntry {
  province: string;
  isMunicipality?: boolean;
}

const flatCities: FlatCity[] = provinceCityGuides.flatMap((province) =>
  province.cities.map((city) => ({
    ...city,
    province: province.province,
    isMunicipality: province.isMunicipality,
  }))
);

export default function CityGuidesClient() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return flatCities;
    return flatCities.filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.province.toLowerCase().includes(query) ||
        city.universities.some((u) => u.toLowerCase().includes(query))
    );
  }, [debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <PageShell
      title="City Guides"
      description="China's major study destinations, province by province — with the top universities and a look at each city."
    >
      <div className="space-y-16">
        {/* ── SEARCH ─────────────────────────────────────────── */}
        <div>
          <div className="max-w-xl">
            <Input
              icon={<Search className="w-4 h-4" aria-hidden="true" />}
              placeholder="Search by city, province, or university..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label="Search city guides"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                title="No cities found"
                description="Try a different city, province, or university name."
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {paginated.map((city) => (
                  <div
                    key={`${city.province}-${city.name}`}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="relative h-56 w-full bg-gray-100">
                      <CityImage src={city.image} alt={city.name} />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <Badge variant="orange" className="bg-white/90 text-gray-800 font-semibold shadow-sm">
                          {city.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
                          {city.province}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm mb-4">{city.description}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                          Top Universities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {city.universities.map((u) => (
                            <span
                              key={u}
                              className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filtered.length}
                itemsPerPage={limit}
                pageSizeOptions={[10, 20, 30]}
                onPageChange={setPage}
                onItemsPerPageChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
                className="bg-white rounded-2xl border border-gray-100 mt-8"
              />
            </>
          )}
        </div>

        {/* ── CITY TIERS ─────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding City Tiers</h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-4xl">
            Chinese cities are unofficially categorized into &quot;Tiers&quot; based on population, GDP, and political administration.
            Your choice of city tier will heavily influence your living costs, cultural immersion, and career opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tier 1</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">The Megacities</p>
              <p className="text-gray-600 leading-relaxed">Beijing, Shanghai, Guangzhou, Shenzhen. International hubs, highest living costs, excellent career opportunities.</p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">New Tier 1</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Rising Stars</p>
              <p className="text-gray-600 leading-relaxed">Chengdu, Hangzhou, Wuhan, Xi&apos;an. Rapid development, excellent universities, very livable.</p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tier 2 & 3</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Authentic China</p>
              <p className="text-gray-600 leading-relaxed">Kunming, Xiamen, Harbin. Low cost of living, perfect for language immersion and traditional culture.</p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
