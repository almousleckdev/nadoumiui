import React from "react";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  School,
  Handshake,
  Users,
  MessageSquare,
  UserCircle,
} from "lucide-react";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const ADMIN_LINKS: SidebarLink[] = [
  { label: "Overview", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Applications", href: "/admin/dashboard/applications", icon: <FileText className="w-5 h-5" /> },
  { label: "Scholarships", href: "/admin/dashboard/scholarships", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Universities", href: "/admin/dashboard/universities", icon: <School className="w-5 h-5" /> },
  { label: "Partners", href: "/admin/dashboard/partners", icon: <Handshake className="w-5 h-5" /> },
  { label: "Students", href: "/admin/dashboard/students", icon: <Users className="w-5 h-5" /> },
  { label: "Messages", href: "/admin/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Profile Settings", href: "/admin/dashboard/profile", icon: <UserCircle className="w-5 h-5" /> },
];

export const STUDENT_LINKS: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "My Applications", href: "/dashboard/applications", icon: <FileText className="w-5 h-5" /> },
  { label: "Profile Settings", href: "/dashboard/profile", icon: <UserCircle className="w-5 h-5" /> },
  { label: "Support Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
];
