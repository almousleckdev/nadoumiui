"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import apiClient from "@/services/apiClient";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { passwordRule } from "@/lib/validations/password";

const resetPasswordSchema = z
  .object({
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export interface ResetPasswordFormProps {
  apiEndpoint: string;
  loginUrl: string;
  forgotPasswordUrl: string;
}

export function ResetPasswordForm({ apiEndpoint, loginUrl, forgotPasswordUrl }: ResetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing password reset token.");
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid token. Please request a new password reset link.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post(apiEndpoint, {
        token,
        newPassword: data.password,
      });
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reset password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout title="Invalid Token" subtitle="The password reset link is invalid or has expired.">
        <div className="text-center space-y-4">
          <Link href={forgotPasswordUrl} className="block w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-700">
            Request a new link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create New Password" subtitle="Enter your new password below to regain access.">
      {isSuccess ? (
        <div className="p-4 rounded-xl text-center space-y-4 mt-8 border bg-emerald-50 border-emerald-100">
          <p className="text-sm font-medium text-emerald-700">
            Your password has been reset successfully.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="w-full py-3 font-semibold shadow-md shadow-orange-600/20"
            onClick={() => router.push(loginUrl)}
          >
            Sign In Now
          </Button>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3 font-semibold shadow-md shadow-orange-600/20"
              isLoading={isSubmitting}
            >
              Reset Password
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
