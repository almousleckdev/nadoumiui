"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { submitPartnershipInquiry, type PartnershipType } from "@/services/partnershipService";
import { getErrorMessage } from "@/utils/getErrorMessage";

const PARTNERSHIP_TYPE_OPTIONS = [
  { value: "", label: "Select an option..." },
  { value: "agency", label: "Student Recruitment Agency" },
  { value: "university", label: "University / Institution" },
  { value: "influencer", label: "Content Creator / Influencer" },
  { value: "student", label: "Student (Looking for admission)" },
  { value: "other", label: "Other" },
];

const DEGREE_LEVEL_OPTIONS = [
  { value: "", label: "Select..." },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "Ph.D." },
  { value: "language", label: "Language Program" },
];

const partnershipSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    workEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    partnershipType: z.string().min(1, "Please select a partnership type"),
    companyName: z.string().optional(),
    degreeLevel: z.string().optional(),
    intendedMajor: z.string().optional(),
    preferredCity: z.string().optional(),
    preferredMeetingDate: z.string().optional(),
    preferredMeetingTime: z.string().optional(),
    message: z.string().min(10, "Please tell us a bit more (at least 10 characters)"),
  })
  .superRefine((data, ctx) => {
    if (data.partnershipType === "student") {
      if (!data.degreeLevel) {
        ctx.addIssue({ code: "custom", path: ["degreeLevel"], message: "Please select a degree level" });
      }
      if (!data.intendedMajor) {
        ctx.addIssue({ code: "custom", path: ["intendedMajor"], message: "Intended major is required" });
      }
      if (!data.preferredCity) {
        ctx.addIssue({ code: "custom", path: ["preferredCity"], message: "Preferred city is required" });
      }
    } else if (!data.companyName) {
      ctx.addIssue({ code: "custom", path: ["companyName"], message: "Company / agency name is required" });
    }
  });

type PartnershipFormValues = z.infer<typeof partnershipSchema>;

export function PartnershipForm() {
  const [userTimezone, setUserTimezone] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { partnershipType: "" },
  });

  const partnershipType = watch("partnershipType");

  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const onSubmit = async (data: PartnershipFormValues) => {
    try {
      await submitPartnershipInquiry({
        firstName: data.firstName,
        lastName: data.lastName,
        workEmail: data.workEmail,
        phone: data.phone,
        partnershipType: data.partnershipType as PartnershipType,
        companyName: data.companyName || undefined,
        degreeLevel: data.partnershipType === "student" ? data.degreeLevel || undefined : undefined,
        intendedMajor: data.partnershipType === "student" ? data.intendedMajor || undefined : undefined,
        preferredCity: data.partnershipType === "student" ? data.preferredCity || undefined : undefined,
        preferredMeetingDate: data.preferredMeetingDate || undefined,
        preferredMeetingTime: data.preferredMeetingTime || undefined,
        timezone: userTimezone || undefined,
        message: data.message,
      });
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to submit your inquiry. Please try again."));
      throw err;
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Inquiry Sent!</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Thank you for your interest in partnering with Nadoumi. Our business development team will review your
          inquiry and get back to you within 24 hours on business days.
        </p>
        <button onClick={() => reset()} className="mt-8 text-orange-600 font-semibold hover:text-orange-700">
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name" placeholder="Jane" error={errors.firstName?.message} {...register("firstName")} />
          <Input label="Last Name" placeholder="Doe" error={errors.lastName?.message} {...register("lastName")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Work Email"
            type="email"
            placeholder="jane@company.com"
            error={errors.workEmail?.message}
            {...register("workEmail")}
          />
          <Input
            label="Phone / WhatsApp"
            placeholder="+1 234 567 8900"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <Select
          label="Partnership Type"
          options={PARTNERSHIP_TYPE_OPTIONS}
          error={errors.partnershipType?.message}
          {...register("partnershipType")}
        />

        {partnershipType === "student" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Degree Level"
              options={DEGREE_LEVEL_OPTIONS}
              error={errors.degreeLevel?.message}
              {...register("degreeLevel")}
            />
            <Input
              label="Intended Major"
              placeholder="e.g. MBBS"
              error={errors.intendedMajor?.message}
              {...register("intendedMajor")}
            />
            <Input
              label="Preferred City"
              placeholder="e.g. Beijing"
              error={errors.preferredCity?.message}
              {...register("preferredCity")}
            />
          </div>
        ) : (
          <Input
            label="Company / Agency Name"
            placeholder="Your Organization"
            error={errors.companyName?.message}
            {...register("companyName")}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Preferred Meeting Date" type="date" {...register("preferredMeetingDate")} />
          <div>
            <Input
              label={
                userTimezone ? `Preferred Meeting Time (${userTimezone})` : "Preferred Meeting Time"
              }
              type="time"
              {...register("preferredMeetingTime")}
            />
            <p className="text-xs text-gray-400 mt-2">
              Please select a time in your local timezone — we&apos;ll convert it to Beijing Time for our team.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">How can we collaborate?</label>
          <textarea
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow resize-y"
            placeholder="Tell us a bit about your organization and what you have in mind..."
            {...register("message")}
          />
          {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full font-bold shadow-md shadow-orange-600/20"
          isLoading={isSubmitting}
        >
          Submit Inquiry
        </Button>
      </form>
    </>
  );
}
