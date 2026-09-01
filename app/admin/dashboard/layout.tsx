"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { logoutAdmin, getAdminProfile } from "@/services/authService";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import Sidebar from "@/components/layout/Sidebar";
import Loading from "@/components/ui/Loading";

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
    retry: false,
    staleTime: 5 * 60 * 1000,
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
    return <Loading variant="page" className="min-h-screen bg-gray-50" />;
  }

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
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Log Out"
        message="Are you sure you want to log out of the Nadoumi Admin Portal? You will need to log back in to access dashboard analytics."
        confirmText="Log Out"
      />
    </div>
  );
}
