"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import type { Scholarship } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ColumnOptions {
  onDelete: (id: string) => void;
}

export const getAdminScholarshipColumns = ({
  onDelete,
}: ColumnOptions): ColumnDef<Scholarship>[] => [
  {
    accessorKey: "logo",
    header: () => <div className="w-20">Logo</div>,
    cell: ({ row }) => {
      const s = row.original;
      const logoUrl = s.coverImage
        ? s.coverImage.startsWith("http")
          ? s.coverImage
          : `http://localhost:3002${s.coverImage}`
        : s.universities?.[0]?.logo
        ? s.universities[0].logo.startsWith("http")
          ? s.universities[0].logo
          : `http://localhost:3002${s.universities[0].logo}`
        : null;

      return (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={s.title}
              width={48}
              height={48}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400 uppercase">
              {s.title.charAt(0)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div>
          <span className="font-bold text-gray-800 block leading-tight text-base">
            {s.title}
          </span>
          {s.universities?.[0] && (
            <span className="text-xs text-gray-400 block mt-0.5 font-medium">
              {s.universities[0].name}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "fundingLevel",
    header: "Funding Level",
    cell: ({ row }) => (
      <Badge variant="orange">
        {row.original.scholarshipCategory.replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "programLevel",
    header: "Program Level",
    cell: ({ row }) => (
      <span className="text-gray-500 font-medium">
        {row.original.programCategories.join(", ")}
      </span>
    ),
  },
  {
    accessorKey: "availableSlots",
    header: "Available Slots",
    cell: ({ row }) => (
      <span className="text-gray-700 font-semibold">
        {row.original.availableSlots} slots
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "published" || status === "active"
              ? "success"
              : "warning"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const s = row.original;
      return (
        <div className="text-right space-x-2">
          <Link href={`/admin/dashboard/scholarships/${s.id}/edit`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-orange-500 hover:text-orange-400 font-semibold inline-block"
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-400 font-semibold"
            onClick={() => onDelete(s.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
