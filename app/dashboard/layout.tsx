"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { logoutStudent, getStudentProfile } from "@/services/authService";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Sidebar, { SidebarLink } from "@/components/layout/Sidebar";
import Loading from "@/components/ui/Loading";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { isLoading, isError } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getStudentProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Authentication Guard
  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);



  if (isLoading) {
    return <Loading variant="page" className="min-h-screen bg-gray-50" />;
  }

  if (isError) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar 
        title="Nadoumi"
        subtitle="Student Workspace"
        role="student"
        onLogout={() => setIsLogoutModalOpen(true)}
      />

      {/*Main Content Area*/}
      <main className="flex-1 min-w-0 pb-20 md:pb-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/*Logout Confirmation Modal*/}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Log Out"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to log out of your student workspace? You will need to log back in to access your dashboard.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => logoutStudent()}>
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
