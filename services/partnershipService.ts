import apiClient from "./apiClient";
import type { ApiResponse } from "@/types";

export type PartnershipType = "agency" | "university" | "influencer" | "student" | "other";

export interface PartnershipInquiryPayload {
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  partnershipType: PartnershipType;
  companyName?: string;
  degreeLevel?: string;
  intendedMajor?: string;
  preferredCity?: string;
  preferredMeetingDate?: string;
  preferredMeetingTime?: string;
  timezone?: string;
  message: string;
}

// POST /api/partnership
export async function submitPartnershipInquiry(payload: PartnershipInquiryPayload): Promise<{ id: string }> {
  const { data } = await apiClient.post<ApiResponse<{ id: string }>>("/partnership", payload);
  return data.data;
}
