import apiClient from "./apiClient";
import type { Partner, PartnerFilters, ApiResponse, PartnerStatus } from "@/types";

interface PartnersListResponse {
  partners: Partner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// GET /api/partners
export async function getPartners(filters?: PartnerFilters): Promise<PartnersListResponse> {
  const params: Record<string, string | number> = {};
  if (filters?.search) params.search = filters.search;
  if (filters?.city) params.city = filters.city;
  if (filters?.province) params.province = filters.province;
  if (filters?.status) params.status = filters.status;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  const { data } = await apiClient.get<ApiResponse<PartnersListResponse>>("/partners", { params });
  return data.data;
}

// GET /api/partners/:id
export async function getPartnerById(id: string): Promise<Partner> {
  const { data } = await apiClient.get<ApiResponse<Partner>>(`/partners/${id}`);
  return data.data;
}

// POST /api/partners (Admin only)
export async function createPartner(payload: Partial<Partner>): Promise<Partner> {
  const { data } = await apiClient.post<ApiResponse<Partner>>("/partners", payload);
  return data.data;
}

// PUT /api/partners/:id (Admin only)
export async function updatePartner(id: string, payload: Partial<Partner>): Promise<Partner> {
  const { data } = await apiClient.put<ApiResponse<Partner>>(`/partners/${id}`, payload);
  return data.data;
}

// PATCH /api/partners/:id/status (Admin only)
export async function updatePartnerStatus(id: string, status: PartnerStatus): Promise<Partner> {
  const { data } = await apiClient.patch<ApiResponse<Partner>>(`/partners/${id}/status`, { status });
  return data.data;
}

// DELETE /api/partners/:id (Admin only)
export async function deletePartner(id: string): Promise<void> {
  await apiClient.delete(`/partners/${id}`);
}
