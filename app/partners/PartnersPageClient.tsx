"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Handshake,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  GraduationCap,
  Building,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { getPartners } from "@/services/partnerService";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StatsHeroStrip from "@/components/common/StatsHeroStrip";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { Loading } from "@/components/ui/Loading";
import { resolveDocumentUrl, getSafeExternalUrl } from "@/utils/resolveUrl";

export default function PartnersPageClient() {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["partners", "public"],
    queryFn: () => getPartners({ status: "active", limit: 100 }),
  });

  const allPartners = data?.partners ?? [];

  // Extract unique provinces for filter bar, deduped case-insensitively
  // (e.g. "Hubei" and "hubei" collapse into a single entry).
  const provinces = useMemo(() => {
    const map = new Map<string, string>();
    allPartners.forEach((p) => {
      const trimmed = p.province?.trim();
      if (trimmed) map.set(trimmed.toLowerCase(), trimmed);
    });
    return Array.from(map.values()).sort();
  }, [allPartners]);

  // Filtered partners based strictly on selected province
  const filteredPartners = useMemo(() => {
    if (selectedProvince === "all") return allPartners;
    return allPartners.filter(
      (partner) => partner.province?.trim().toLowerCase() === selectedProvince.toLowerCase()
    );
  }, [allPartners, selectedProvince]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* ========================================================================= */}
        {/* HERO SECTION (Clean White Aesthetic)                                      */}
        {/* ========================================================================= */}
        <section className="relative pt-32 pb-14 bg-white border-b border-gray-100">
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-800 mb-6 shadow-sm">
              <Handshake className="w-4 h-4 text-orange-600" />
              <span>Institutional Cooperation Network</span>
              <span className="text-gray-300">&bull;</span>
              <span>Direct University Pathways</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight text-balance">
              Partner Universities <br className="hidden sm:inline" />
              Across China
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed text-balance mb-8">
              Every institution in our network maintains a formal agreement with Sichuan Nadoumi Education Consulting — ensuring reserved scholarship allocations, direct admissions channels, and verified support for international scholars.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/partnership">
                <Button variant="primary" size="lg" className="shadow-md shadow-orange-600/20 font-bold px-8 py-3">
                  Become an Academic Partner
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/scholarships">
                <Button variant="outline" size="lg" className="font-semibold px-8 py-3 border-gray-200 text-gray-800 hover:bg-gray-50">
                  Browse Scholarships
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SHARED FLOATING STATS STRIP                                               */}
        {/* ========================================================================= */}
        <section className="py-10 bg-slate-50 border-b border-gray-200">
          <StatsHeroStrip />
        </section>

        {/* ========================================================================= */}
        {/* PROVINCE FILTER BAR (No Search Box)                                       */}
        {/* ========================================================================= */}
        {provinces.length > 0 && (
          <section className="pt-12 pb-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-orange-600" />
                <span>Filter by Location:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedProvince("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedProvince === "all"
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Locations ({allPartners.length})
                </button>
                {provinces.map((prov) => {
                  const count = allPartners.filter(
                    (p) => p.province?.trim().toLowerCase() === prov.toLowerCase()
                  ).length;
                  return (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvince(prov)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        selectedProvince.toLowerCase() === prov.toLowerCase()
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {prov} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PARTNERS GRID                                                             */}
        {/* ========================================================================= */}
        <section className="py-10 pb-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 h-64 space-y-4"
                >
                  <div className="flex gap-4">
                    <Loading variant="skeleton" className="w-16 h-16 rounded-xl" />
                    <div className="flex-1 space-y-2 py-1">
                      <Loading variant="skeleton" className="h-4 rounded w-3/4" />
                      <Loading variant="skeleton" className="h-3 rounded w-1/2" />
                    </div>
                  </div>
                  <Loading variant="skeleton" className="h-16 rounded" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <ErrorState
              error={error}
              title="We couldn't load partner institutions"
              onRetry={() => refetch()}
              isRetrying={isRefetching}
            />
          )}

          {!isLoading && !error && filteredPartners.length === 0 && (
            <EmptyState
              icon={<Building className="w-8 h-8 text-gray-400" />}
              title={
                selectedProvince === "all"
                  ? "No partner institutions available yet"
                  : "No matching partner institutions found"
              }
              description={
                selectedProvince === "all"
                  ? "Check back soon as we expand our partner network."
                  : "Try selecting a different location filter."
              }
            />
          )}

          {!isLoading && !error && filteredPartners.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => (
                <Card
                  key={partner.id}
                  hover
                  className="p-6 flex flex-col justify-between border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="space-y-4">
                    {/* Header: Logo + Names + Rank */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-slate-50 flex items-center justify-center shrink-0">
                        {partner.logo ? (
                          <Image
                            src={resolveDocumentUrl(partner.logo)}
                            alt={partner.nameEn}
                            fill
                            sizes="56px"
                            unoptimized
                            className="object-contain p-1.5"
                          />
                        ) : (
                          <span className="text-lg font-bold text-gray-700 font-heading">
                            {partner.nameEn.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
                          {partner.nameEn}
                        </h3>
                        {partner.nameCn && (
                          <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
                            {partner.nameCn}
                          </p>
                        )}
                        {(partner.city || partner.province) && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                            <span>{[partner.city, partner.province].filter(Boolean).join(", ")}</span>
                          </p>
                        )}
                      </div>

                      {partner.rank && (
                        <span className="shrink-0 text-xs font-bold text-gray-800 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                          <Award className="w-3 h-3 text-orange-600" />
                          #{partner.rank}
                        </span>
                      )}
                    </div>

                    {/* Partnership Badge */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Partner
                      </span>
                      {typeof partner.totalStudents === "number" && partner.totalStudents > 0 && (
                        <span className="text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
                          {partner.totalStudents.toLocaleString()} Students
                        </span>
                      )}
                    </div>

                    {/* Introduction */}
                    {partner.introduction && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {partner.introduction}
                      </p>
                    )}
                  </div>

                  {/* Actions & Links */}
                  <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between gap-3">
                    {getSafeExternalUrl(partner.website) ? (
                      <a
                        href={getSafeExternalUrl(partner.website)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Official Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">Institutional Partner</span>
                    )}

                    <Link href={`/scholarships?search=${encodeURIComponent(partner.nameEn)}`}>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">
                        View Scholarships
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* COOPERATION SHOWCASE                                                      */}
        {/* ========================================================================= */}
        <section className="py-16 bg-slate-50 border-t border-gray-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-700 bg-white border border-gray-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                Institutional Cooperation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Why Chinese Universities Partner with Nadoumi
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                We provide our institutional partners with qualified, authenticated international applicants and comprehensive admissions coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                  <GraduationCap className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Pre-Vetted Academic Talent</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every applicant undergoes academic evaluation, transcript validation, and language proficiency screening prior to submission.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Dedicated Quota Management</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We guarantee consistent international student intake matching institutional capacity across Bachelor, Master, PhD, and Language tracks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900">
                  <Handshake className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">End-to-End Onboarding Support</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  From JW202 visa documentation and embassy briefings to arrival and campus registration, we ensure high conversion from admission to enrollment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CALL TO ACTION BANNER                                                     */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Expand Your Global Reach with Nadoumi
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you are a Chinese university seeking international scholars or an agency looking for verified admissions pathways, let&apos;s build a strategic partnership.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/partnership">
                <Button variant="primary" size="lg" className="font-bold px-8 py-3 shadow-md shadow-orange-600/20">
                  Submit Partnership Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-gray-200 text-gray-800 hover:bg-gray-50 font-semibold px-8 py-3">
                  Contact Business Development
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
