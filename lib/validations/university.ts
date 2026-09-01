import { z } from "zod";

export const universitySchema = z.object({
  universityId: z.string().min(3, "University ID must be at least 3 characters").optional().or(z.literal("")).nullable(),
  name: z.string().min(2, "English Name must be at least 2 characters"),
  nameInChinese: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  type: z.enum(["Public", "Private"]).or(z.string()).default("Public"),
  foundedYear: z.coerce.number().int().optional().nullable(),
  totalStudents: z.coerce.number().int().optional().nullable(),
  internationalStudents: z.coerce.number().int().optional().nullable(),
  facultyCount: z.coerce.number().int().optional().nullable(),
  numberOfPrograms: z.coerce.number().int().optional().nullable(),
  introduction: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  history: z.string().optional().nullable(),
  
  // String Arrays
  highlights: z.array(z.string()).optional().nullable(),
  opportunities: z.array(z.string()).optional().nullable(),
  partnershipCountries: z.array(z.string()).optional().nullable(),
  searchTags: z.array(z.string()).optional().nullable(),
  searchKeywords: z.string().optional().nullable(),
  advantages: z.array(z.string()).optional().nullable(),
  campusFacilities: z.array(z.string()).optional().nullable(),
  albums: z.array(z.string()).optional().nullable(), // Campus life images

  scholarshipAvailability: z.enum(["Available", "Limited", "Not Available"]).or(z.string()).optional().nullable(),
  
  // Complex Arrays/Objects mapped to JSON in Prisma
  scholarshipNotes: z.array(
    z.object({
      name: z.string().optional().or(z.literal("")),
      notes: z.string().optional().or(z.literal("")),
    }).passthrough()
  ).optional().nullable(),
  accommodation: z.array(
    z.object({
      type: z.string().optional().or(z.literal("")),
      pricePerYear: z.union([z.number(), z.string()]).optional(),
      feeUnit: z.string().optional(),
      facilities: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }).passthrough()
  ).optional().nullable(),
  rankings: z.array(
    z.object({
      rank: z.union([z.number(), z.string()]).optional(),
      organization: z.string().optional().or(z.literal("")),
      year: z.union([z.number(), z.string()]).optional(),
    }).passthrough()
  ).optional().nullable(),
  requiredDocuments: z.array(
    z.object({
      name: z.string().optional().or(z.literal("")),
      required: z.coerce.boolean().default(true).optional(),
      notes: z.string().optional(),
    }).passthrough()
  ).optional().nullable(),
  majors: z.array(
    z.object({
      name: z.string().optional().or(z.literal("")),
      degree: z.string().optional(),
      duration: z.string().optional(),
      tuitionFee: z.union([z.number(), z.string()]).optional(),
    }).passthrough()
  ).optional().nullable(),

  // Contact Info
  nearbyInfo: z.string().optional().nullable(),
  officialWebsite: z.string().optional().nullable().or(z.literal("")),
  admissionsEmail: z.string().optional().nullable().or(z.literal("")),
  officePhone: z.string().optional().nullable(),
  
  // Media
  logo: z.string().optional().nullable(),
  bannerImage: z.string().optional().nullable(),
  
  // Metrics & Promotional
  qsRank: z.coerce.number().int().optional().nullable(),
  isRecommended: z.coerce.boolean().optional(),
  isPartner: z.coerce.boolean().optional(),
  partnerId: z.string().optional().nullable(),
  isTop: z.coerce.boolean().optional(),
  recommendationNotes: z.string().optional().nullable(),
  
  // State
  status: z.enum(["active", "inactive", "draft"]).or(z.string()).default("active"),
});

export type UniversityFormValues = z.infer<typeof universitySchema>;
