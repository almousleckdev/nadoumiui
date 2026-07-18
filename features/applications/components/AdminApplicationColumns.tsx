"use client";
import { ColumnDef } from "@tanstack/react-table";
import type { Application } from "@/types";
import { ApplicationStatusBadge } from "@/components/ui/ApplicationStatusBadge";
import { formatDate } from "@/utils/formatDate";
import Button from "@/components/ui/Button";

interface ColumnOptions {
  onUpdateStatus: (app: Application) => void;
}

export const getAdminApplicationColumns = ({
  onUpdateStatus,
}: ColumnOptions): ColumnDef<Application>[] => [
  {
    id: "studentInfo",
    header: "Student Info",
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div>
          <span className="font-bold text-gray-800 block leading-tight">
            {student?.firstName} {student?.lastName}
          </span>
          <span className="text-xs text-gray-400 block mt-0.5 font-medium">
            {student?.email} | Passport: {student?.passportNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "scholarship",
    header: "Scholarship",
    cell: ({ row }) => {
      const scholarship = row.original.scholarship;
      return (
        <div>
          <span className="font-semibold text-gray-700 block leading-tight">
            {scholarship?.title}
          </span>
          <span className="text-xs text-gray-400 block mt-0.5 font-mono">
            ID: {row.original.applicationId}
          </span>
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
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateStatus(row.original)}
        >
          Update Status
        </Button>
      </div>
    ),
  },
];
