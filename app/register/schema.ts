import { z } from "zod";

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

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    country: z.string().min(2, "Country is required"),
    city: z.string().min(2, "City is required"),
    passportNumber: z.string().min(5, "Passport is required"),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine(
        (dateStr) => {
          const date = new Date(dateStr);
          const today = new Date();
          let age = today.getFullYear() - date.getFullYear();
          const m = today.getMonth() - date.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
          }
          return age >= 17;
        },
        { message: "You must be at least 17 years old to register" },
      ),
    gender: z.enum(["Male", "Female", "Other"]),

    currentLevel: z.string().min(1, "Current education level is required"),
    university: z.string().min(1, "University or School name is required"),
    major: z.string().min(1, "Major or Field of study is required"),
    gpa: z.string().optional(),
    gradYear: z.string().min(4, "Graduation year is required"),

    studyLevel: z.string().min(1, "Desired study level is required"),
    desiredField: z.string().min(1, "Desired field of study is required"),
    preferredCities: z.array(z.string()).min(1, "Select at least one preferred city"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    terms: z.literal(true, { message: "You must accept the terms and conditions" }),
    accuracy: z.literal(true, { message: "You must confirm all information is accurate" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
