import React from "react";
import { FileText, Clock, GraduationCap, School } from "lucide-react";

export interface KpiItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export function buildAdminKpis(summary?: {
  totalApplications: number;
  pendingReviews: number;
  totalScholarships: number;
  activeUniversities: number;
}): KpiItem[] {
  return [
    {
      label: "Total Applications",
      value: summary?.totalApplications ?? 0,
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Pending Reviews",
      value: summary?.pendingReviews ?? 0,
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      label: "Active Scholarships",
      value: summary?.totalScholarships ?? 0,
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Partner Universities",
      value: summary?.activeUniversities ?? 0,
      icon: <School className="w-6 h-6" />,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];
}
