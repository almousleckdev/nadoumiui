"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Application } from "@/types";
import { ApplicationStatusBadge } from "@/components/ui/ApplicationStatusBadge";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/ui/Button";

interface ColumnOptions {
  onViewDetails: (app: Application) => void;
}

export const getStudentApplicationColumns = ({
  onViewDetails,
}: ColumnOptions): ColumnDef<Application>[] => [
  {
    accessorKey: "applicationId",
    header: "Application ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold text-gray-700">
        {row.original.applicationId}
      </span>
    ),
  },
  {
    accessorKey: "scholarship",
    header: "Scholarship",
    cell: ({ row }) => {
      const scholarship = row.original.scholarship;
      return (
        <div>
          <span className="font-bold text-gray-900 block leading-tight">
            {scholarship?.title ?? "Chinese Government Program"}
          </span>
          {scholarship?.universities?.[0] && (
            <span className="text-xs text-gray-400 mt-0.5 block">
              {scholarship.universities[0].name}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted Date",
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
    header: () => <div className="text-right">Details</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          variant="outline"
          size="sm"
          className="font-semibold"
          onClick={() => onViewDetails(row.original)}
        >
          View PDF/Logs
        </Button>
      </div>
    ),
  },
];
