"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { FileText, Clock, GraduationCap, School } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/adminService";
import { adminDashboardRecentApplicationColumns } from "@/features/applications/components/AdminDashboardRecentApplicationColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

export default function AdminDashboardOverviewPage() {
  const { data: stats, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: getDashboardStats,
  });

  const recentSubmissions = useMemo(() => {
    return stats?.recentSubmissions?.slice(0, 10) || [];
  }, [stats]);

  if (isLoading) {
    return <Loading variant="page" text="Loading dashboard..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="We couldn't load dashboard statistics"
        onRetry={() => refetch()}
        isRetrying={isRefetching}
      />
    );
  }

  const kpis = [
    {
      label: "Total Applications",
      value: stats?.summary.totalApplications ?? 0,
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Pending Reviews",
      value: stats?.summary.pendingReviews ?? 0,
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      label: "Active Scholarships",
      value: stats?.summary.totalScholarships ?? 0,
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Partner Universities",
      value: stats?.summary.activeUniversities ?? 0,
      icon: <School className="w-6 h-6" />,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 font-heading">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor incoming applications, enrollment statistics, and general platform metrics.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${kpi.color}`}>
                {kpi.icon}
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 block">{kpi.label}</span>
                <span className="text-2xl font-bold text-gray-900 mt-1 block font-heading">{kpi.value}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Applications Management Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-900 font-heading">Recent System Applications</h2>
          <Link href="/admin/dashboard/applications">
            <Button variant="outline" size="sm">
              Manage Applications
            </Button>
          </Link>
        </div>

        {recentSubmissions.length > 0 ? (
          <DataTable columns={adminDashboardRecentApplicationColumns} data={recentSubmissions} />
        ) : (
          <EmptyState
            title="No applications submitted yet"
            description="New applications will show up here as they arrive."
          />
        )}
      </Card>
    </div>
  );
}
