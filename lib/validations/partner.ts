import { z } from "zod";

export const partnerSchema = z.object({
  partnerId: z.string().optional(),
  nameEn: z.string().min(2, "English name must be at least 2 characters"),
  nameCn: z.string().optional(),
  logo: z.string().optional(),
  topMajors: z.array(z.string()).optional(),
  research: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  rank: z.coerce.number().int().optional(),
  totalStudents: z.coerce.number().int().optional(),
  totalForeignStudents: z.coerce.number().int().optional(),
  totalColleges: z.coerce.number().int().optional(),
  introduction: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.coerce.number().int().optional(),
  status: z.enum(["active", "inactive", "draft"]),
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
