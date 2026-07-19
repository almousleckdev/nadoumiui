"use client";

import React from "react";
import { loginStudent } from "@/services/authService";
import { LoginForm } from "@/components/auth/LoginForm";

export default function StudentLoginPage() {
  const handleLogin = async (credentials: { email: string; password: string }) => {
    await loginStudent(credentials);
  };

  return (
    <LoginForm
      title="Student Portal"
      subtitle="Sign in to manage your applications and profile"
      forgotPasswordUrl="/forgot-password"
      registerUrl="/register"
      onLogin={handleLogin}
      onSuccessRedirect="/dashboard"
    />
  );
}
