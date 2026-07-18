"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthLayout } from "./AuthLayout";

export interface LoginFormProps {
  title: string;
  subtitle: string;
  theme?: "light" | "dark";
  forgotPasswordUrl: string;
  registerUrl?: string;
  backUrl?: string;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
  onSuccessRedirect: string;
}

export function LoginForm({
  title,
  subtitle,
  forgotPasswordUrl,
  registerUrl,
  backUrl,
  onLogin,
  onSuccessRedirect,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Please fill in all fields.");
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      await onLogin({ email, password });
      router.push(onSuccessRedirect);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401 || status === 403 || err.message?.includes("401")) {
        setError("Invalid email or password.");
      } else {
        setError(
          err.response?.data?.error?.message || err.response?.data?.message || err.message || "Invalid credentials. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3.5 rounded-lg text-sm font-medium bg-red-50 border border-red-100 text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link
                href={forgotPasswordUrl}
                className="text-xs font-semibold text-orange-600 hover:text-orange-500"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-md shadow-orange-600/20 text-base py-3"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </div>
      </form>

      {registerUrl && (
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account? </span>
          <Link href={registerUrl} className="font-semibold text-orange-600 hover:text-orange-500">
            Create an account
          </Link>
        </div>
      )}

      {backUrl && (
        <div className="mt-8 text-center text-xs">
          <Link
            href={backUrl}
            className="font-medium transition-colors text-gray-500 hover:text-gray-700"
          >
            &larr; Back to Main Website
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
