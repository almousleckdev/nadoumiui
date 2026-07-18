"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ApplicationStatusBadge } from "@/components/ui/ApplicationStatusBadge";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/ui/Button";

interface RecentApp {
  id: string;
  applicationId: string;
  status: string;
  submittedAt: string;
  scholarship?: {
    title: string;
  } | null;
}

export const dashboardRecentApplicationColumns: ColumnDef<RecentApp>[] = [
  {
    accessorKey: "scholarshipName",
    header: "Scholarship Name",
    cell: ({ row }) => {
      const app = row.original;
      return (
        <div>
          <span className="font-semibold text-gray-950 block">
            {app.scholarship?.title ?? "Chinese Government Scholarship"}
          </span>
          <span className="text-xs text-gray-400">
            ID: {app.applicationId}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted On",
    cell: ({ row }) => {
      return <span className="text-gray-500">{formatDate(row.original.submittedAt)}</span>;
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
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: () => {
      return (
        <div className="text-right">
          <Link href={`/dashboard/applications`}>
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold text-orange-600 hover:text-orange-500"
            >
              Details
            </Button>
          </Link>
        </div>
      );
    },
  },
];
