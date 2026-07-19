"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import { getPartners } from "@/services/partnerService";
import PageShell from "@/components/layout/PageShell";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

export default function PartnersPageClient() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["partners", "public"],
    queryFn: () => getPartners({ status: "active", limit: 100 }),
  });

  const partners = data?.partners ?? [];

  const provinceCount = useMemo(() => {
    return new Set(data?.partners?.map((p) => p.province).filter(Boolean)).size;
  }, [data?.partners]);

  return (
    <PageShell
      title="Our Partners"
      description="We collaborate with top universities and leading organizations to provide the best opportunities for our students."
    >
      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT: Intro + stats + CTA (sticky on desktop) */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 border border-orange-100 text-orange-600">
              <Handshake className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">A network built on trust</h2>
            <p className="text-gray-600 leading-relaxed">
              Every institution below has a direct partnership with Nadoumi — negotiated
              admissions pathways, dedicated scholarship quotas, and a verified track record
              of supporting international students.
            </p>

            {!isLoading && !error && partners.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                  <span className="text-2xl font-black text-gray-900 block font-heading">
                    {partners.length}+
                  </span>
                  <span className="text-xs text-gray-500">Partner Institutions</span>
                </div>
                <div className="rounded-xl border border-gray-200 bg-slate-50 p-4">
                  <span className="text-2xl font-black text-gray-900 block font-heading">
                    {provinceCount}+
                  </span>
                  <span className="text-xs text-gray-500">Provinces Represented</span>
                </div>
              </div>
            )}

            <Link href="/partnership" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full font-semibold">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: Partner grid */}
        <div className="flex-1 min-w-0">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-2xl border border-gray-100 p-6 h-40" />
              ))}
            </div>
          )}

          {error && (
            <ErrorState
              title="We couldn't load our partners"
              onRetry={() => refetch()}
              isRetrying={isRefetching}
            />
          )}

          {!isLoading && !error && partners.length === 0 && (
            <EmptyState
              icon={<Handshake className="w-5 h-5 text-gray-400" aria-hidden="true" />}
              title="No partners published yet"
              description="Check back soon as we grow our network of partner institutions."
            />
          )}

          {!isLoading && !error && partners.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} hover className="p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0">
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
                        <span className="text-lg font-bold text-gray-400">
                          {partner.nameEn.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 leading-tight truncate">{partner.nameEn}</h3>
                      {partner.nameCn && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">{partner.nameCn}</p>
                      )}
                      {(partner.city || partner.province) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {[partner.city, partner.province].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>
                    {partner.rank && (
                      <span className="ml-auto shrink-0 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-2.5 py-1">
                        #{partner.rank}
                      </span>
                    )}
                  </div>

                  {partner.introduction && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {partner.introduction}
                    </p>
                  )}

                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-orange-600 hover:text-orange-700 mt-auto"
                    >
                      Visit Website &rarr;
                    </a>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
