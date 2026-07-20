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
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={p.nameEn}
              width={40}
              height={40}
              unoptimized
              className="object-contain w-full h-full p-1"
            />
          ) : (
            <span className="text-sm font-extrabold text-slate-400 uppercase">{p.nameEn.charAt(0)}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "nameEn",
    header: "Partner Name",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div>
          <span className="font-extrabold text-slate-900 block text-base leading-tight">{p.nameEn}</span>
          {p.nameCn && <span className="text-xs text-slate-400 block mt-0.5">{p.nameCn}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "partnerType",
    header: "Partner Type",
    cell: ({ row }) => {
      const type = row.original.partnerType || "university";
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
            type === "agency"
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}
        >
          {type === "agency" ? "Agency" : "University"}
        </span>
      );
    },
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const p = row.original;
      const loc = [p.city, p.country || "China"].filter(Boolean).join(", ");
      return <span className="text-slate-600 font-medium text-sm">{loc || "China"}</span>;
    },
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
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900 font-bold inline-block">
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700 font-bold"
            onClick={() => onDelete(p.id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
