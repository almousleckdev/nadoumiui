"use client";

import React from "react";
import toast from "react-hot-toast";
import { loginAdmin } from "@/services/authService";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  const handleLogin = async (credentials: { email: string; password: string }) => {
    await loginAdmin(credentials);
    toast.success("Welcome back, Admin!");
  };

  return (
    <LoginForm
      title="Administrator Log In"
      subtitle="Access the internal application and management panel"
      theme="dark"
      forgotPasswordUrl="/admin/forgot-password"
      backUrl="/"
      onLogin={handleLogin}
      onSuccessRedirect="/admin/dashboard"
    />
  );
}
