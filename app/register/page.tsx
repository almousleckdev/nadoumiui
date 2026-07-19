"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";

import { registerStudent } from "@/services/authService";
import Button from "@/components/ui/Button";
import OTPVerification from "./components/OTPVerification";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { registerSchema, type RegisterFormValues } from "./schema";
import { PersonalInfoSection } from "./sections/PersonalInfoSection";
import { EducationSection } from "./sections/EducationSection";
import { PreferencesSection } from "./sections/PreferencesSection";
import { SecuritySection } from "./sections/SecuritySection";

export default function StudentRegisterPage() {
  const [serverError, setServerError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const countries = useMemo(() => countryList().getData(), []);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      preferredCities: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError("");
    try {
      await registerStudent({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        country: data.country,
        city: data.city,
        gender: data.gender,
        passportNumber: data.passportNumber,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        currentLevel: data.currentLevel,
        university: data.university,
        major: data.major,
        gpa: data.gpa,
        gradYear: data.gradYear,
        studyLevel: data.studyLevel,
        desiredField: data.desiredField,
        preferredCities: data.preferredCities,
      });

      toast.success("Account created successfully!");
      setRegisteredEmail(data.email);
    } catch (err) {
      setServerError(getErrorMessage(err, "Registration failed. Please try again."));
    }
  };

  if (registeredEmail) {
    return (
      <AuthLayout title="Verify Your Account" subtitle="Check your email for the OTP">
        <OTPVerification email={registeredEmail} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Student Account"
      subtitle="Get access to premium scholarships and application guidance"
      align="start"
    >
      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          {serverError}
        </div>
      )}

      <FormProvider {...form}>
        <form className="space-y-10 w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoSection countries={countries} />
          <EducationSection />
          <PreferencesSection />
          <SecuritySection />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-md shadow-orange-600/20 py-3"
              isLoading={isSubmitting}
              disabled={!isValid || isSubmitting}
            >
              Create Account & Proceed
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
