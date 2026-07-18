"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { forgotPassword, resetPassword } from "@/services/authService";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function StudentForgotPasswordPage() {
  const router = useRouter();

  const handleSendEmail = async (email: string) => {
    await forgotPassword(email);
  };

  const handleVerifyOtpAndReset = async (otp: string, password: string) => {
    await resetPassword(otp, password);
  };

  const handleSuccessRedirect = () => {
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <ForgotPasswordForm
      title="Forgot your password?"
      subtitle="Enter your email address and we'll send you an OTP."
      theme="light"
      useOtp={true}
      loginUrl="/login"
      onSendEmail={handleSendEmail}
      onVerifyOtpAndReset={handleVerifyOtpAndReset}
      onSuccessRedirect={handleSuccessRedirect}
    />
  );
}
