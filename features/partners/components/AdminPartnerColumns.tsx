"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import type { Partner } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { resolveDocumentUrl } from "@/utils/resolveUrl";

interface ColumnOptions {
  onDelete: (id: string) => void;
}

export const getAdminPartnerColumns = ({ onDelete }: ColumnOptions): ColumnDef<Partner>[] => [
  {
    accessorKey: "logo",
    header: () => <div className="w-20">Logo</div>,
    cell: ({ row }) => {
      const p = row.original;
      const logoUrl = p.logo ? resolveDocumentUrl(p.logo) : null;

      return (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={p.nameEn}
              width={40}
              height={40}
              unoptimized
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-sm font-bold text-gray-400 uppercase">{p.nameEn.charAt(0)}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "nameEn",
    header: "Institution Name",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div>
          <span className="font-bold text-gray-800 block text-base leading-tight">{p.nameEn}</span>
          {p.nameCn && <span className="text-xs text-gray-400 block mt-0.5">{p.nameCn}</span>}
        </div>
      );
    },
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const p = row.original;
      return <span className="text-gray-500">{p.city ? `${p.city}, ${p.province || ""}` : "China"}</span>;
    },
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => (
      <span className="text-gray-700 font-semibold">{row.original.rank ? `#${row.original.rank}` : "N/A"}</span>
    ),
  },
  {
    accessorKey: "totalStudents",
    header: "Total Students",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.totalStudents?.toLocaleString() ?? "N/A"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status === "active" ? "success" : "warning"}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="text-right space-x-2">
          <Link href={`/admin/dashboard/partners/${p.id}/edit`}>
            <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 font-semibold inline-block">
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-400 font-semibold"
            onClick={() => onDelete(p.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
