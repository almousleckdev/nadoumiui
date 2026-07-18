"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import type { University, Scholarship } from "@/types";
import { getUniversityById } from "@/services/universityService";
import { getScholarships } from "@/services/scholarshipService";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { MetricCard } from "@/components/ui/MetricCard";
import { Tabs, Tab } from "@/components/ui/Tabs";
import { UserGroupIcon, AcademicCapIcon, GlobeAltIcon, StarIcon } from "@heroicons/react/24/outline";

import { UniversityHero } from "./UniversityHero";
import { UniversityInquirySidebar } from "./UniversityInquirySidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { ScholarshipsTab } from "./tabs/ScholarshipsTab";
import { CampusTab } from "./tabs/CampusTab";
import { LocationTab } from "./tabs/LocationTab";

const TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "scholarships", label: "Admissions & Scholarships" },
  { id: "campus", label: "Campus Life" },
  { id: "location", label: "Location & Contact" },
];

const DEFAULT_OVERVIEW_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920";

interface UniversityDetailsClientProps {
  initialUniversity: University;
  initialScholarships: Scholarship[];
}

export default function UniversityDetailsClient({
  initialUniversity,
  initialScholarships,
}: UniversityDetailsClientProps) {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || initialUniversity.id;
  const [activeTab, setActiveTab] = useState<string>("overview");

  const { data: university, isLoading, error } = useQuery({
    queryKey: ["university", id],
    queryFn: () => getUniversityById(id),
    initialData: initialUniversity,
  });

  const { data: scholarshipsData } = useQuery({
    queryKey: ["scholarships", "university", university?.name],
    queryFn: () => getScholarships({ search: university?.name, limit: 3 }),
    initialData: { scholarships: initialScholarships, total: initialScholarships.length, page: 1, limit: 3, totalPages: 1 },
    enabled: !!university?.name,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading variant="page" text="Loading university..." />
        <Footer />
      </>
    );
  }

  if (error || !university) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">University Not Found</h2>
            <p className="text-gray-500 mb-6">The university you are looking for does not exist or has been removed.</p>
            <Button onClick={() => router.push("/universities")}>Back to Universities</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const albumImages: string[] =
    Array.isArray(university.albums) && university.albums.length > 0
      ? (university.albums as string[])
      : university.bannerImage
        ? [university.bannerImage]
        : [];
  const overviewImage = albumImages[0] ?? DEFAULT_OVERVIEW_IMAGE;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-gray-50 min-h-screen">
        <UniversityHero university={university} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-16 relative z-20">
            <MetricCard
              label="Total Students"
              value={university.totalStudents?.toLocaleString() || "N/A"}
              icon={<UserGroupIcon className="w-6 h-6" />}
            />
            <MetricCard
              label="Intl. Students"
              value={university.internationalStudents?.toLocaleString() || "N/A"}
              icon={<GlobeAltIcon className="w-6 h-6" />}
            />
            <MetricCard
              label="Degree Programs"
              value={university.numberOfPrograms?.toLocaleString() || "N/A"}
              icon={<AcademicCapIcon className="w-6 h-6" />}
            />
            <MetricCard
              label="QS Ranking"
              value={university.qsRank ? `#${university.qsRank}` : "Unranked"}
              icon={<StarIcon className="w-6 h-6" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

              <div className="pt-6">
                {activeTab === "overview" && <OverviewTab university={university} overviewImage={overviewImage} />}
                {activeTab === "scholarships" && (
                  <ScholarshipsTab
                    scholarshipAvailability={university.scholarshipAvailability}
                    scholarships={scholarshipsData?.scholarships ?? []}
                  />
                )}
                {activeTab === "campus" && <CampusTab university={university} albumImages={albumImages} />}
                {activeTab === "location" && <LocationTab university={university} />}
              </div>
            </div>

            <UniversityInquirySidebar universityName={university.name} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
