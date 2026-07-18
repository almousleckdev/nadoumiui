"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { logoutAdmin, getAdminProfile } from "@/services/authService";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Sidebar, { SidebarLink } from "@/components/layout/Sidebar";
import { UserCircle } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getAdminProfile,
    retry: false, // Do not retry on auth failures, redirect immediately
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  // Authentication Guard for Admins
  useEffect(() => {
    if (isError) {
      router.push("/admin/login");
    }
  }, [isError, router]);



  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/admin/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500 border-r-2" />
      </div>
    );
  }

  // If there's an error, the useEffect above will redirect, but we can also return null or loading to avoid flash
  if (isError) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 flex flex-col md:flex-row">
      <Sidebar
        title="Nadoumi"
        subtitle="Admin Portal"
        role="admin"
        theme="dark"
        onLogout={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Log Out"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to log out of the Nadoumi Admin Portal? You
            will need to log back in to access dashboard analytics.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
