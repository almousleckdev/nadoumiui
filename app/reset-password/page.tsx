"use client";

import React, { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Loading } from "@/components/ui/Loading";

export default function StudentResetPasswordPage() {
  return (
    <Suspense fallback={<Loading variant="page" text="Loading..." />}>
      <ResetPasswordForm
        apiEndpoint="/students/reset-password"
        loginUrl="/login"
        forgotPasswordUrl="/forgot-password"
      />
    </Suspense>
  );
}
