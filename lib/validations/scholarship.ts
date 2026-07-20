import { z } from "zod";

export const scholarshipSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  titleInChinese: z.string().optional(),
  universities: z.array(z.string()).optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  programCategories: z.array(z.enum(["Language", "Bachelor", "Master", "PhD"])),
  scholarshipCategory: z.enum([
    "Self_funded",
    "Partial",
    "CSC",
    "Province",
    "Universities",
    "HSK",
    "Type_A",
    "Type_B",
    "Type_C",
    "Other",
  ]),
  field: z.string().optional(),
  programName: z.string().optional(),
  degree: z.string().optional(),
  duration: z.coerce.number().int().nonnegative().optional(),
  scholarshipDuration: z.coerce.number().int().nonnegative().optional(),
  scholarshipDurationText: z.string().optional(),
  intake: z.string().optional(),
  startDate: z.string().optional(),
  applicationDeadline: z.string().min(1, "Application deadline is required"), 

  // Requirements
  ageMin: z.coerce.number().int().nonnegative().optional(),
  ageMax: z.coerce.number().int().nonnegative().optional(),
  acceptedCountries: z.array(z.string()).optional(),
  chinaVisitPolicy: z.string().optional(),
  acceptMinors: z.coerce.boolean().optional(),
  currentLocationPolicy: z.string().optional(),
  scoreRequirements: z.string().optional(),
  scoreRequirementsEnglish: z.string().optional(),
  scoreRequirementsChinese: z.string().optional(),
  gpaMin: z.coerce.number().nonnegative().optional(),
  ieltsScore: z.coerce.number().nonnegative().optional(),
  toeflScore: z.coerce.number().int().nonnegative().optional(),
  duolingoScore: z.coerce.number().int().nonnegative().optional(),
  hskLevel: z.coerce.number().int().nonnegative().optional(),

  // University Fees
  originalTuitionFee: z.coerce.number().nonnegative().optional(),
  tuitionFeeAfterScholarship: z.coerce.number().nonnegative().optional(),
  accommodationFeeQuad: z.coerce.number().nonnegative().optional(),
  accommodationFeeAfterScholarship: z.coerce.number().nonnegative().optional(),
  registrationFee: z.string().optional(),
  universityFeeCurrency: z.enum(["RMB", "USD"]).default("RMB").optional(),

  // Nadoumi Agent Fees
  nadoumiApplicationFee: z.coerce.number().nonnegative().optional(),
  nadoumiServiceFee: z.coerce.number().nonnegative().optional(),
  nadoumiFeeCurrency: z.enum(["RMB", "USD"]).default("USD").optional(),

  hasStipend: z.coerce.boolean().optional().default(false),
  stipend: z.union([z.string(), z.record(z.string(), z.any()), z.array(z.any())]).optional(),
  programSelection: z
    .union([
      z.array(
        z.object({
          programType: z.enum(["Language", "Bachelor", "Master", "PhD"]),
          majors: z.array(z.string()).optional(),
          stipendAmount: z.coerce.number().optional().nullable(),
          stipendUnit: z.string().optional().nullable(),
        })
      ),
      z.record(
        z.string(),
        z.object({
          majors: z.array(z.string()).optional(),
          stipendAmount: z.coerce.number().optional().nullable(),
          stipendUnit: z.string().optional().nullable(),
        })
      ),
    ])
    .optional(),

  accommodationFee: z.string().optional(),
  applicationDocuments: z.any().optional(),
  requirements: z.string().optional(),
  benefits: z.union([z.array(z.string()), z.string()]).optional(),
  applicantRequirements: z.string().optional(),
  additionalDocuments: z
    .array(
      z.object({
        name: z.string().min(1, "Document name is required"),
        required: z.coerce.boolean().default(true),
        notes: z.string().optional(),
      })
    )
    .optional(),
  feeStructure: z.string().optional(),
  additionalFees: z.string().optional(),

  // Miscellaneous
  insurance: z.string().optional(),
  visaFee: z.coerce.number().nonnegative().optional(),
  teachingLanguage: z.enum(["English", "Chinese", "Both"]).default("English"),
  isRecommended: z.coerce.boolean().optional(),
  isHot: z.coerce.boolean().optional(),
  isTop: z.coerce.boolean().optional(),
  recommendationNotes: z.string().optional(),
  scholarshipPolicy: z.string().optional(),
  specialNotes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  availableSlots: z.coerce.number().int().nonnegative().default(1),
  category: z.string().optional(),
  status: z.enum(["draft", "published", "closed", "active", "inactive", "limited"]).default("draft"),
}).refine((data) => {
  if (data.ageMin && data.ageMax && data.ageMin > data.ageMax) {
    return false;
  }
  return true;
}, {
  message: "Minimum age cannot be greater than maximum age",
  path: ["ageMin"], // Attach the error to ageMin
});

export type ScholarshipFormValues = z.infer<typeof scholarshipSchema>;
