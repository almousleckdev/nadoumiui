import { z } from "zod";

export const partnerSchema = z.object({
  partnerId: z.string().optional().nullable(),
  partnerType: z.enum(["university", "agency"]).or(z.string()).default("university"),
  nameEn: z.string().min(2, "English name must be at least 2 characters"),
  nameCn: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  contactPerson: z.string().optional().nullable(),
  contactEmail: z.string().optional().nullable().or(z.literal("")),
  contactPhone: z.string().optional().nullable(),
  servicesOffered: z.array(z.string()).optional().nullable(),
  commissionRate: z.string().optional().nullable(),
  agreementNotes: z.string().optional().nullable(),
  topMajors: z.array(z.string()).optional().nullable(),
  research: z.string().optional().nullable(),
  rank: z.coerce.number().int().optional().nullable(),
  totalStudents: z.coerce.number().int().optional().nullable(),
  totalForeignStudents: z.coerce.number().int().optional().nullable(),
  totalColleges: z.coerce.number().int().optional().nullable(),
  introduction: z.string().optional().nullable(),
  website: z.string().optional().nullable().or(z.literal("")),
  order: z.coerce.number().int().optional().nullable(),
  status: z.enum(["active", "inactive", "draft"]).or(z.string()).default("active"),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
