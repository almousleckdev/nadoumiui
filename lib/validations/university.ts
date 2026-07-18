import { z } from "zod";

export const universitySchema = z.object({
  universityId: z.string().min(3, "University ID must be at least 3 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  nameInChinese: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  type: z.enum(["Public", "Private"]),
  foundedYear: z.coerce.number().int().optional(),
  totalStudents: z.coerce.number().int().optional(),
  internationalStudents: z.coerce.number().int().optional(),
  facultyCount: z.coerce.number().int().optional(),
  numberOfPrograms: z.coerce.number().int().optional(),
  introduction: z.string().optional(),
  description: z.string().optional(),
  history: z.string().optional(),
  
  // String Arrays
  highlights: z.array(z.string()).optional(),
  opportunities: z.array(z.string()).optional(),
  partnershipCountries: z.array(z.string()).optional(),
  searchTags: z.array(z.string()).optional(),
  searchKeywords: z.string().optional(),
  advantages: z.array(z.string()).optional(),
  campusFacilities: z.array(z.string()).optional(),
  albums: z.array(z.string()).optional(), // Campus life images

  scholarshipAvailability: z.enum(["Available", "Limited", "Not Available"]).optional(),
  
  // Complex Arrays/Objects mapped to JSON in Prisma
  scholarshipNotes: z.array(
    z.object({
      name: z.string(),
      notes: z.string(),
    })
  ).optional(),
  accommodation: z.array(
    z.object({
      type: z.string(),
      pricePerYear: z.union([z.number(), z.string()]).optional(),
      feeUnit: z.string().optional(),
      facilities: z.array(z.string()).optional(),
      notes: z.string().optional(),
    })
  ).optional(),
  rankings: z.array(
    z.object({
      rank: z.union([z.number(), z.string()]),
      organization: z.string(),
      year: z.union([z.number(), z.string()]).optional(),
    })
  ).optional(),
  requiredDocuments: z.array(
    z.object({
      name: z.string(),
      required: z.coerce.boolean().default(true),
      notes: z.string().optional(),
    })
  ).optional(),
  majors: z.array(
    z.object({
      name: z.string(),
      degree: z.string().optional(),
      duration: z.string().optional(),
      tuitionFee: z.union([z.number(), z.string()]).optional(),
    })
  ).optional(),

  // Contact Info
  nearbyInfo: z.string().optional(),
  officialWebsite: z.string().url("Invalid URL").optional().or(z.literal("")),
  admissionsEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  officePhone: z.string().optional(),
  
  // Media
  logo: z.string().optional(),
  bannerImage: z.string().optional(),
  
  // Metrics & Promotional
  qsRank: z.coerce.number().int().optional().nullable(),
  isRecommended: z.coerce.boolean().optional(),
  isPartner: z.coerce.boolean().optional(),
  isTop: z.coerce.boolean().optional(),
  recommendationNotes: z.string().optional(),
  
  // State
  status: z.enum(["active", "inactive", "draft"]),
});

export type UniversityFormValues = z.infer<typeof universitySchema>;
