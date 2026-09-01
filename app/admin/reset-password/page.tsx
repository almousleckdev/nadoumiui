"use client";

import React, { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Loading } from "@/components/ui/Loading";

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={<Loading variant="page" text="Loading..." />}>
      <ResetPasswordForm
        apiEndpoint="/admin/reset-password"
        loginUrl="/admin/login"
        forgotPasswordUrl="/admin/forgot-password"
      />
    </Suspense>
  );
}
