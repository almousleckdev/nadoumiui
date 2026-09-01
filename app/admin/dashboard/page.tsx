"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/adminService";
import { adminDashboardRecentApplicationColumns } from "@/features/applications/components/AdminDashboardRecentApplicationColumns";
import { DataTable } from "@/components/ui/DataTable";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import Loading from "@/components/ui/Loading";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import { buildAdminKpis } from "@/data/adminDashboardData";

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

  const kpis = buildAdminKpis(stats?.summary);

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
          <MetricCard
            key={index}
            label={kpi.label}
            value={kpi.value}
            icon={kpi.icon}
            iconClassName={kpi.color}
          />
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
