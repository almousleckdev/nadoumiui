"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

import {
  ChevronRight,
  LogOut,
  LayoutDashboard,
  FileText,
  GraduationCap,
  School,
  Users,
  MessageSquare,
  UserCircle,
  Handshake
} from "lucide-react";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  title?: string;
  subtitle?: string;
  role?: "admin" | "student";
  links?: SidebarLink[];
  theme?: "light" | "dark";
  onLogout: () => void;
}

export default function Sidebar({
  title = "Nadoumi",
  subtitle = "Workspace",
  role = "student",
  links: customLinks,
  theme = "light",
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isDark = theme === "dark";

  const adminLinks: SidebarLink[] = [
    { label: "Overview", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Applications", href: "/admin/dashboard/applications", icon: <FileText className="w-5 h-5" /> },
    { label: "Scholarships", href: "/admin/dashboard/scholarships", icon: <GraduationCap className="w-5 h-5" /> },
    { label: "Universities", href: "/admin/dashboard/universities", icon: <School className="w-5 h-5" /> },
    { label: "Partners", href: "/admin/dashboard/partners", icon: <Handshake className="w-5 h-5" /> },
    { label: "Students", href: "/admin/dashboard/students", icon: <Users className="w-5 h-5" /> },
    { label: "Messages", href: "/admin/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Profile Settings", href: "/admin/dashboard/profile", icon: <UserCircle className="w-5 h-5" /> },
  ];

  const studentLinks: SidebarLink[] = [
    { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "My Applications", href: "/dashboard/applications", icon: <FileText className="w-5 h-5" /> },
    { label: "Profile Settings", href: "/dashboard/profile", icon: <UserCircle className="w-5 h-5" /> },
    { label: "Support Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const links = customLinks || (role === "admin" ? adminLinks : studentLinks);

  return (
    <>
      {/*Sidebar Layout (Desktop)*/}
      <aside
        className={cn(
          "hidden md:flex md:flex-col shrink-0 transition-all duration-300 relative group/sidebar",
          isDark ? "bg-slate-900 border-r border-slate-800" : "bg-white border-r border-gray-200",
          isCollapsed ? "w-16" : "w-56"
        )}
      >
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-8 border rounded-full p-1 shadow-sm z-10 transition-all opacity-0 group-hover/sidebar:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
            isDark 
              ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 focus:ring-orange-500" 
              : "bg-white border-gray-200 text-gray-400 hover:text-orange-600 focus:ring-orange-500"
          )}
          style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className={cn("h-24 border-b flex items-center justify-center overflow-hidden", 
          isDark ? "border-slate-800" : "border-gray-100"
        )}>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
            <Image src="/logo/logo.jpg" alt="Nadoumi" width={64} height={64} className="object-cover" />
          </div>
        </div>

        {/* Sidebar Nav links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden no-scrollbar">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={isCollapsed ? link.label : undefined}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 group",
                  active
                    ? (isDark ? "bg-orange-600 text-white focus:ring-orange-500 border-none" : "bg-orange-50 text-orange-600 focus:ring-orange-500")
                    : (isDark ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"),
                  isDark && !active && "focus:ring-slate-500",
                  isCollapsed ? "justify-center" : "gap-3.5"
                )}
              >
                <div className="shrink-0">{link.icon}</div>
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{link.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Bottom Trigger */}
        <div className={cn("p-3 border-t", isDark ? "border-slate-800" : "border-gray-100")}>
          <button
            type="button"
            title={isCollapsed ? "Log Out" : undefined}
            onClick={onLogout}
            className={cn(
              "flex items-center w-full px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1",
              isDark 
                ? "text-red-400 hover:bg-red-950/30" 
                : "text-red-600 hover:bg-red-50",
              isCollapsed ? "justify-center" : "gap-3.5"
            )}
          >
            <div className="shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="whitespace-nowrap">Log Out</span>}
          </button>
        </div>
      </aside>

      {/*Mobile Navigation Bar (Bottom Tab Bar)*/}
      <aside className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40 border-t h-16 flex items-center justify-start px-2 overflow-x-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] hide-scrollbar",
        isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
      )}>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center shrink-0 w-[72px] gap-1 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 py-2 rounded-lg",
                active 
                  ? (isDark ? "text-orange-500" : "text-orange-600 bg-orange-50") 
                  : (isDark ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-900")
              )}
            >
              <div className="shrink-0">{link.icon}</div>
              <span className="truncate w-full text-center px-1">{link.label.split(" ")[0]}</span>
            </Link>
          );
        })}
        <button
          onClick={onLogout}
          className={cn(
            "flex flex-col items-center justify-center shrink-0 w-[72px] gap-1 text-[10px] font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 py-2 rounded-lg",
            isDark ? "text-red-400 hover:bg-red-950/30" : "text-red-600 hover:bg-red-50"
          )}
        >
          <div className="shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="truncate w-full text-center">Logout</span>
        </button>
      </aside>
    </>
  );
}
