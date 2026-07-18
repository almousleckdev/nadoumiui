"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";

import { registerStudent } from "@/services/authService";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OTPVerification from "./components/OTPVerification";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { getErrorMessage } from "@/utils/getErrorMessage";

const currentLevelOptions = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

const studyLevelOptions = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    country: z.string().min(2, "Country is required"),
    city: z.string().min(2, "City is required"),
    passportNumber: z.string().min(5, "Passport is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required").refine((dateStr) => {
      const date = new Date(dateStr);
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age >= 17;
    }, { message: "You must be at least 17 years old to register" }),
    gender: z.enum(["Male", "Female", "Other"]),

    currentLevel: z.string().min(1, "Current education level is required"),
    university: z.string().min(1, "University or School name is required"),
    major: z.string().min(1, "Major or Field of study is required"),
    gpa: z.string().optional(),
    gradYear: z.string().min(4, "Graduation year is required"),

    studyLevel: z.string().min(1, "Desired study level is required"),
    desiredField: z.string().min(1, "Desired field of study is required"),
    preferredCities: z
      .array(z.string())
      .min(1, "Select at least one preferred city"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    terms: z.literal(true, {
      message: "You must accept the terms and conditions",
    }),
    accuracy: z.literal(true, {
      message: "You must confirm all information is accurate",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function StudentRegisterPage() {
  const [serverError, setServerError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const countries = useMemo(() => countryList().getData(), []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      preferredCities: [],
    },
  });

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
    >
      {serverError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
          {serverError}
        </div>
      )}

      <form className="space-y-10 w-full max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
        {/* 1. PERSONAL INFORMATION */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-gray-900">1. Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Surname (as on passport) *"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <Input
              label="Given Name (as on passport) *"
              type="text"
              placeholder="John"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Email Address *"
              type="email"
              placeholder="john.doe@example.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number *
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    international
                    defaultCountry="US"
                    className={`flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-orange-600/20 focus-within:border-orange-600 ${
                      errors.phone ? "border-red-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Country *
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countries}
                    value={countries.find((c) => c.label === field.value)}
                    onChange={(val) => field.onChange(val?.label)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select Country"
                  />
                )}
              />
              {errors.country && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.country.message}</p>
              )}
            </div>

            <Input
              label="Current City *"
              type="text"
              placeholder="e.g. New York"
              {...register("city")}
              error={errors.city?.message}
            />

            <Input
              label="Passport Number *"
              type="text"
              placeholder="A00000000"
              {...register("passportNumber")}
              error={errors.passportNumber?.message}
            />

            <Input
              label="Date of Birth *"
              type="date"
              {...register("dateOfBirth")}
              error={errors.dateOfBirth?.message}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Gender *
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={genderOptions}
                    value={genderOptions.find((o) => o.value === field.value)}
                    onChange={(val) => field.onChange(val?.value)}
                    placeholder="Select Gender"
                  />
                )}
              />
              {errors.gender && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* 2. EDUCATION BACKGROUND */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-gray-900">2. Education Background</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Current Level *
              </label>
              <Controller
                name="currentLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={currentLevelOptions}
                    value={currentLevelOptions.find((o) => o.value === field.value)}
                    onChange={(val) => field.onChange(val?.value)}
                    placeholder="Select Level"
                  />
                )}
              />
              {errors.currentLevel && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.currentLevel.message}</p>
              )}
            </div>

            <Input
              label="University / School Name *"
              type="text"
              placeholder="Harvard University"
              {...register("university")}
              error={errors.university?.message}
            />

            <Input
              label="Major / Field of Study *"
              type="text"
              placeholder="Computer Science"
              {...register("major")}
              error={errors.major?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="GPA (Optional)"
                type="text"
                placeholder="3.8"
                {...register("gpa")}
                error={errors.gpa?.message}
              />
              <Input
                label="Graduation Year *"
                type="text"
                placeholder="2024"
                {...register("gradYear")}
                error={errors.gradYear?.message}
              />
            </div>
          </div>
        </section>

        {/* 3. STUDY PREFERENCES */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-gray-900">3. Study Preferences</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Desired Study Level *
              </label>
              <Controller
                name="studyLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={studyLevelOptions}
                    value={studyLevelOptions.find((o) => o.value === field.value)}
                    onChange={(val) => field.onChange(val?.value)}
                    placeholder="Select Desired Level"
                  />
                )}
              />
              {errors.studyLevel && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.studyLevel.message}</p>
              )}
            </div>

            <Input
              label="Desired Field / Major *"
              type="text"
              placeholder="e.g. Artificial Intelligence"
              {...register("desiredField")}
              error={errors.desiredField?.message}
            />

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Preferred Cities *
              </label>
              <Controller
                name="preferredCities"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    components={{ DropdownIndicator: null }}
                    value={(field.value || []).map((v) => ({ value: v, label: v }))}
                    onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                    placeholder="Type a city and press Enter..."
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  />
                )}
              />
              {errors.preferredCities && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.preferredCities.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* 4. AUTHENTICATION */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-2">
            <h3 className="text-lg font-bold text-gray-900">4. Security & Confirmation</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Password *"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
              autoComplete="new-password"
            />
            <Input
              label="Confirm Password *"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms")}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the Terms of Service & Privacy Policy
                </label>
                {errors.terms && (
                  <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="accuracy"
                  type="checkbox"
                  {...register("accuracy")}
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accuracy" className="font-medium text-gray-700">
                  I confirm that all information provided is accurate and exactly matches my passport.
                </label>
                {errors.accuracy && (
                  <p className="mt-1 text-xs text-red-500">{errors.accuracy.message}</p>
                )}
              </div>
            </div>
          </div>
        </section>

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

      <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
