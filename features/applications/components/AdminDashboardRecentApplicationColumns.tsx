"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ApplicationStatusBadge } from "@/components/ui/ApplicationStatusBadge";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/ui/Button";

interface AdminRecentApp {
  id: string;
  studentName: string;
  scholarship: string;
  university: string;
  date: string;
  status: string;
}

export const adminDashboardRecentApplicationColumns: ColumnDef<AdminRecentApp>[] =
  [
    {
      accessorKey: "studentName",
      header: "Student",
      cell: ({ row }) => {
        return (
          <span className="font-bold text-gray-900 dark:text-gray-800 block">
            {row.original.studentName}
          </span>
        );
      },
    },
    {
      accessorKey: "scholarship",
      header: "Scholarship",
      cell: ({ row }) => {
        const app = row.original;
        return (
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-700 block leading-tight">
              {app.scholarship}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5 font-medium">
              {app.university}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Submitted Date",
      cell: ({ row }) => {
        return <span className="text-gray-500 dark:text-gray-500">{formatDate(row.original.date)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <ApplicationStatusBadge status={row.original.status} />;
      },
    },
    {
      id: "details",
      header: () => <div className="text-right">Details</div>,
      cell: () => {
        return (
          <div className="text-right">
            <Link href="/admin/dashboard/applications">
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 dark:text-orange-500"
              >
                Manage
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
