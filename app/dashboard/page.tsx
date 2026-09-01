"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getStudentProfile } from "@/services/authService";
import { getStudentApplications } from "@/services/applicationService";
import { dashboardRecentApplicationColumns } from "@/features/applications/components/DashboardRecentApplicationColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import { PlusCircle } from "lucide-react";

export default function StudentDashboardPage() {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getStudentProfile,
  });

  const {
    data: applications,
    isLoading: isAppsLoading,
    error: appsError,
    refetch: refetchApps,
  } = useQuery({
    queryKey: ["studentApplications"],
    queryFn: getStudentApplications,
  });

  const isLoading = isProfileLoading || isAppsLoading;
  const error = profileError || appsError;
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await Promise.all([refetchProfile(), refetchApps()]);
    setIsRetrying(false);
  };

  // Derive status counters
  const total = applications?.length ?? 0;
  const pending = applications?.filter((a) => a.status === "pending" || a.status === "under_review").length ?? 0;
  const accepted = applications?.filter((a) => a.status === "accepted" || a.status === "interview_passed").length ?? 0;
  const rejected = applications?.filter((a) => a.status === "rejected" || a.status === "interview_failed" || a.status === "revoked").length ?? 0;

  if (isLoading) {
    return <Loading variant="page" text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="We couldn't load your dashboard"
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />
    );
  }

  const recentApplications = applications?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
            Welcome back, {profile?.firstName ?? "Scholar"}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your Chinese university applications and scholarship status below.
          </p>
        </div>
        <Link href="/scholarships">
          <Button variant="primary" size="md" className="shadow-sm">
            Browse New Scholarships
          </Button>
        </Link>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <MetricCard label="Total Applications" value={total} />
        <MetricCard label="In Progress" value={pending} />
        <MetricCard label="Accepted" value={accepted} />
        <MetricCard label="Rejected" value={rejected} />
      </div>

      {/* Recent Applications Section */}
      <Card className="p-0 overflow-hidden border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 font-heading">Recent Applications</h2>
          {total > 0 && (
            <Link href="/dashboard/applications" className="text-sm font-semibold text-orange-600 hover:text-orange-500">
              View All &rarr;
            </Link>
          )}
        </div>

        {total === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4 border border-gray-100">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 font-heading">No applications submitted</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              You haven&apos;t applied for any scholarships yet. Explore our list of top universities to get started.
            </p>
            <Link href="/scholarships" className="mt-4 inline-block">
              <Button size="sm">Explore Scholarships</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable columns={dashboardRecentApplicationColumns} data={recentApplications} />
          </div>
        )}
      </Card>
    </div>
  );
}
