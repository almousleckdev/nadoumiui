"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Scholarship } from "@/types";
import { getScholarshipById } from "@/services/scholarshipService";
import { ScholarshipDetails } from "@/features/scholarships/components/ScholarshipDetails";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { Timeline, TimelineStep } from "@/components/ui/Timeline";
import { ClockIcon, AcademicCapIcon, DocumentCheckIcon, CheckCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ScholarshipHero } from "./ScholarshipHero";
import { ScholarshipApplySidebar } from "./ScholarshipApplySidebar";

interface ScholarshipDetailsClientProps {
  initialData: Scholarship;
}

function buildApplicationSteps(deadlineStr: string): TimelineStep[] {
  return [
    {
      title: "Check Eligibility",
      description: "Review the general and language requirements carefully.",
      icon: <CheckCircleIcon className="w-5 h-5" />,
    },
    {
      title: "Prepare Documents",
      description: "Gather all required documents including transcripts and language certificates.",
      icon: <DocumentCheckIcon className="w-5 h-5" />,
    },
    {
      title: "Submit Application",
      description: `Complete the online application before ${deadlineStr}.`,
      icon: <AcademicCapIcon className="w-5 h-5" />,
    },
    {
      title: "Review & Interview",
      description: "Wait for the initial review and potential interview invitation.",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },
  ];
}

export default function ScholarshipDetailsPage({ initialData }: ScholarshipDetailsClientProps) {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || initialData.id;

  const { data: scholarship, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => getScholarshipById(id),
    initialData: initialData,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading variant="page" text="Loading details..." />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center px-4">
          <ErrorState
            title="We couldn't load this scholarship"
            onRetry={() => refetch()}
            isRetrying={isRefetching}
            className="max-w-md"
          />
        </main>
        <Footer />
      </>
    );
  }

  if (!scholarship) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 pb-20 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Scholarship Not Found</h2>
            <p className="text-gray-500 mb-6">The scholarship you are looking for does not exist or has closed.</p>
            <Button onClick={() => router.push("/scholarships")}>Browse Scholarships</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const deadlineDate = new Date(scholarship.applicationDeadline);
  const deadlineStr = deadlineDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const daysLeft = Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const isUrgent = daysLeft > 0 && daysLeft <= 14;
  const university = scholarship.universities?.[0];

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 bg-gray-50 min-h-screen">
        <ScholarshipHero scholarship={scholarship} deadlineStr={deadlineStr} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ScholarshipDetails scholarship={scholarship} />

              <section className="pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <ClockIcon className="w-7 h-7 text-blue-600" />
                  Application Process
                </h2>
                <Timeline steps={buildApplicationSteps(deadlineStr)} />
              </section>
            </div>

            <ScholarshipApplySidebar
              scholarship={scholarship}
              university={university}
              daysLeft={daysLeft}
              isUrgent={isUrgent}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
