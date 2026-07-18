"use client";

import React, { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function StudentResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 text-center text-gray-900">Loading...</div>}>
      <ResetPasswordForm
        apiEndpoint="/students/reset-password"
        loginUrl="/login"
        forgotPasswordUrl="/forgot-password"
        theme="light"
      />
    </Suspense>
  );
}
