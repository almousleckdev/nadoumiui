"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import type { University } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ColumnOptions {
  onDelete: (id: string) => void;
}

export const getAdminUniversityColumns = ({
  onDelete,
}: ColumnOptions): ColumnDef<University>[] => [
  {
    accessorKey: "logo",
    header: () => <div className="w-20">Logo</div>,
    cell: ({ row }) => {
      const u = row.original;
      const logoUrl = u.logo
        ? u.logo.startsWith("http")
          ? u.logo
          : `http://localhost:3002${u.logo}`
        : null;

      return (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={u.name}
              width={40}
              height={40}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400 uppercase">
              {u.name.charAt(0)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Institution Name",
    cell: ({ row }) => {
      const u = row.original;
      return (
        <div>
          <span className="font-bold text-gray-800 block text-base leading-tight">
            {u.name}
          </span>
          {u.nameInChinese && (
            <span className="text-xs text-gray-400 block mt-0.5">
              {u.nameInChinese}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const u = row.original;
      return (
        <span className="text-gray-500">
          {u.city ? `${u.city}, ${u.province || ""}` : "China"}
        </span>
      );
    },
  },
  {
    accessorKey: "qsRank",
    header: "QS Rank",
    cell: ({ row }) => (
      <span className="text-gray-700 font-semibold">
        {row.original.qsRank ? `#${row.original.qsRank}` : "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant="info">{row.original.type}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : "warning"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const u = row.original;
      return (
        <div className="text-right space-x-2">
          <Link href={`/admin/dashboard/universities/${u.id}/edit`}>
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
            onClick={() => onDelete(u.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
