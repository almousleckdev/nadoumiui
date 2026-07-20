import { z } from "zod";

export const partnerSchema = z.object({
  partnerId: z.string().optional(),
  partnerType: z.enum(["university", "agency"]).default("university"),
  nameEn: z.string().min(2, "Partner name must be at least 2 characters"),
  nameCn: z.string().optional(),
  logo: z.string().optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  servicesOffered: z.array(z.string()).optional(),
  commissionRate: z.string().optional(),
  agreementNotes: z.string().optional(),
  topMajors: z.array(z.string()).optional(),
  research: z.string().optional(),
  rank: z.coerce.number().int().optional(),
  totalStudents: z.coerce.number().int().optional(),
  totalForeignStudents: z.coerce.number().int().optional(),
  totalColleges: z.coerce.number().int().optional(),
  introduction: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.coerce.number().int().optional(),
  status: z.enum(["active", "inactive", "draft"]).default("active"),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
