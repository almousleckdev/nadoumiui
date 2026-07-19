import apiClient from "./apiClient";
import type { ApiResponse } from "@/types";

export interface ContactInquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// POST /api/contact
export async function submitContactInquiry(payload: ContactInquiryPayload): Promise<{ id: string }> {
  const { data } = await apiClient.post<ApiResponse<{ id: string }>>("/contact", payload);
  return data.data;
}
