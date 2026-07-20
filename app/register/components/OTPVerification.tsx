"use client";

import { OTPInput } from "@/components/auth/OTPInput";


import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { verifyEmail, resendOTP } from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  email: string;
  showHeader?: boolean;
}

export default function OTPVerification({ email, showHeader = false }: OTPVerificationProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;
  const [isResending, setIsResending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    setIsResending(true);
    setServerError("");
    try {
      await resendOTP(email);
      setCountdown(60);

      toast.success("Verification code resent to your email.");
    } catch (err) {
      setServerError(getErrorMessage(err, "Failed to resend OTP"));
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: OTPFormValues) => {
    setServerError("");
    try {
      await verifyEmail(email, data.otp);
      setSuccess(true);
      toast.success("Email verified successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setServerError(getErrorMessage(err, "Invalid OTP"));
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 border border-green-100 text-green-600 mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">
          Email Verified!
        </h3>
        <p className="text-gray-500">
          Redirecting to your student dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="py-2 px-2 sm:px-6">
      {showHeader && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">
            Verify your Email
          </h3>
          <p className="text-sm text-gray-600">
            We&apos;ve sent a 6-digit verification code to <br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium text-center">
            {serverError}
          </div>
        )}

        <div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 text-center">
                Enter Verification Code
              </label>
              <Controller
                control={control}
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
              {errors.otp && (
                <p className="text-xs text-red-500 text-center font-medium mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full font-semibold shadow-sm shadow-orange-600/15"
          isLoading={isSubmitting}
        >
          Verify Account
        </Button>

        <div className="text-center text-sm mt-6">
          <span className="text-gray-500">Didn&apos;t receive the code? </span>
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          ) : (
            <span className="text-gray-400 font-medium">
              Resend in {countdown}s
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
