"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { OTPInput } from "@/components/auth/OTPInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { AuthLayout } from "./AuthLayout";
import { getErrorMessage } from "@/utils/getErrorMessage";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;

export interface ForgotPasswordFormProps {
  title: string;
  subtitle: string;
  theme?: "light" | "dark";
  useOtp?: boolean;
  loginUrl: string;
  onSendEmail: (email: string) => Promise<void>;
  onVerifyOtpAndReset?: (otp: string, password: string) => Promise<void>;
  onSuccessRedirect?: () => void;
}

export function ForgotPasswordForm({
  title,
  subtitle,
  useOtp = false,
  loginUrl,
  onSendEmail,
  onVerifyOtpAndReset,
  onSuccessRedirect,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onEmailSubmit = async (data: EmailFormValues) => {
    setServerError("");
    try {
      await onSendEmail(data.email);
      setRegisteredEmail(data.email);
      setStep(2);
      if (useOtp) {
        toast.success("An OTP has been sent to your email.");
      } else {
        toast.success("Password reset instructions sent.");
      }
    } catch (err) {
      setServerError(getErrorMessage(err, "Failed to send reset link."));
    }
  };

  const onOTPSubmit = async (data: OTPFormValues) => {
    if (!onVerifyOtpAndReset) return;
    setServerError("");
    try {
      await onVerifyOtpAndReset(data.otp, data.password);
      toast.success("Password reset successfully! Please log in.");
      if (onSuccessRedirect) onSuccessRedirect();
    } catch (err) {
      setServerError(getErrorMessage(err, "Failed to reset password."));
    }
  };

  return (
    <AuthLayout 
      title={step === 1 ? title : useOtp ? "Reset Password" : title} 
      subtitle={step === 1 ? subtitle : useOtp ? `Enter the 6-digit OTP sent to ${registeredEmail}` : "Check your email for reset instructions."}
    >
      {serverError && (
        <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-red-50 border border-red-100 text-red-600">
          {serverError}
        </div>
      )}

      {step === 1 ? (
        <form className="space-y-6" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...emailForm.register("email")}
            error={emailForm.formState.errors.email?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full py-3 font-semibold shadow-md shadow-orange-600/20"
            isLoading={emailForm.formState.isSubmitting}
          >
            {useOtp ? "Send OTP" : "Send Reset Link"}
          </Button>
        </form>
      ) : useOtp ? (
        <form className="space-y-6" onSubmit={otpForm.handleSubmit(onOTPSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-center text-gray-700">
              6-Digit OTP
            </label>
            <Controller
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <OTPInput
                  length={6}
                  value={field.value || ""}
                  onChange={field.onChange}
                  autoFocus
                />
              )}
            />
            {otpForm.formState.errors.otp && (
              <p className="text-xs text-red-500 text-center font-medium mt-1">
                {otpForm.formState.errors.otp.message}
              </p>
            )}
          </div>
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            {...otpForm.register("password")}
            error={otpForm.formState.errors.password?.message}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            {...otpForm.register("confirmPassword")}
            error={otpForm.formState.errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-semibold shadow-md shadow-orange-600/20 py-3"
            isLoading={otpForm.formState.isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      ) : (
        <div className="p-4 rounded-xl text-center space-y-4 border bg-emerald-50 border-emerald-100">
          <CheckCircle className="h-10 w-10 mx-auto text-emerald-600" strokeWidth={2} />
          <p className="text-sm text-emerald-700">
            If an account exists for that email, we have sent password reset instructions.
          </p>
          <Link 
            href={loginUrl} 
            className="block w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors bg-gray-800 text-white hover:bg-gray-700"
          >
            Return to Login
          </Link>
        </div>
      )}

      {!(step === 2 && !useOtp) && (
        <div className="mt-8 flex items-center justify-center text-sm">
          <Link 
            href={loginUrl} 
            className="font-medium transition-colors text-orange-600 hover:text-orange-500"
          >
            &larr; Back to Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
