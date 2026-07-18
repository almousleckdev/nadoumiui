"use client";

import { ColumnDef } from "@tanstack/react-table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export interface StudentData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  createdAt: string;
  passportNumber?: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  applications?: Array<{
    id: string;
    applicationId: string;
    status: string;
    submittedAt: string;
    scholarship?: {
      title: string;
      type?: string;
      universities?: Array<{ name: string }>;
    } | null;
  }>;
}

interface ColumnOptions {
  onOpenProfile: (student: StudentData) => void;
}

export const getAdminStudentColumns = ({
  onOpenProfile,
}: ColumnOptions): ColumnDef<StudentData>[] => [
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div>
          <span className="font-bold text-gray-900 block leading-tight">
            {student.firstName} {student.lastName}
          </span>
          {student.applications && student.applications.length > 0 && (
            <span className="text-xs text-gray-500 block font-mono mt-0.5">
              App ID: {student.applications[0].applicationId}
            </span>
          )}
          <span className="text-xs text-gray-500 block mt-0.5">
            {student.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country of Origin",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.country}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Registered",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );
      return <span className="text-gray-500">{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => <Badge variant="success">Active</Badge>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Profile Detail</div>,
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="text-right">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenProfile(student)}
          >
            View Profile
          </Button>
        </div>
      );
    },
  },
];
