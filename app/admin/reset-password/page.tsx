"use client";

import React, { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 text-center text-white">Loading...</div>}>
      <ResetPasswordForm
        apiEndpoint="/admin/reset-password"
        loginUrl="/admin/login"
        forgotPasswordUrl="/admin/forgot-password"
      />
    </Suspense>
  );
}
