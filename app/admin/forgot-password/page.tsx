"use client";

import apiClient from "@/services/apiClient";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function AdminForgotPasswordPage() {
  const handleSendEmail = async (email: string) => {
    await apiClient.post("/admin/forgot-password", { email });
  };

  return (
    <ForgotPasswordForm
      title="Reset Password"
      subtitle="Enter your admin email to receive reset instructions."
      theme="dark"
      useOtp={false}
      loginUrl="/admin/login"
      onSendEmail={handleSendEmail}
    />
  );
}
