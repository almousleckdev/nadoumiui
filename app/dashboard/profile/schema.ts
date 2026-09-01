import { z } from "zod";
import { passwordRule } from "@/lib/validations/password";

export const CURRENT_LEVEL_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

export const STUDY_LEVEL_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Bachelor", label: "Bachelor" },
  { value: "Master", label: "Master" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" },
];

export const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(5, "Phone is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  passportNumber: z.string().min(5, "Passport is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().optional(),
  currentLevel: z.string().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  gpa: z.string().optional(),
  gradYear: z.string().optional(),
  studyLevel: z.string().optional(),
  desiredField: z.string().optional(),
  preferredCities: z.array(z.string()).optional(),
});

export type ProfileFormValues = z.infer<typeof updateProfileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordRule,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
