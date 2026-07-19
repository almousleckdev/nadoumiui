"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage, getErrorStatus } from "@/utils/getErrorMessage";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  title: string;
  subtitle: string;
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
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");
    try {
      await onLogin(data);
      router.push(onSuccessRedirect);
    } catch (err) {
      const status = getErrorStatus(err);
      if (status === 401 || status === 403) {
        setServerError("Invalid email or password.");
      } else {
        setServerError(getErrorMessage(err, "Invalid credentials. Please try again."));
      }
    }
  };

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && (
          <div className="p-3.5 rounded-lg text-sm font-medium bg-red-50 border border-red-100 text-red-600">
            {serverError}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
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
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-md shadow-orange-600/20 text-base py-3"
            isLoading={isSubmitting}
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
