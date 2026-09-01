import apiClient from "./apiClient";
import type {
  University,
  UniversityFilters,
  ApiResponse,
  UniversityStatus,
} from "@/types";

interface UniversitiesListResponse {
  universities: University[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// GET /api/universities
export async function getUniversities(
  filters?: UniversityFilters,
): Promise<UniversitiesListResponse> {
  const params: Record<string, string | number | boolean> = {};
  if (filters?.search) params.search = filters.search;
  if (filters?.city) params.city = filters.city;
  if (filters?.province) params.province = filters.province;
  if (filters?.type) params.type = filters.type;
  if (filters?.isPartner !== undefined) params.isPartner = filters.isPartner;
  if (filters?.isRecommended !== undefined) params.isRecommended = filters.isRecommended;
  if (filters?.isTop !== undefined) params.isTop = filters.isTop;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  const { data } = await apiClient.get<ApiResponse<UniversitiesListResponse>>(
    "/universities",
    { params },
  );
  return data.data;
}

// GET /api/universities/:id
export async function getUniversityById(id: string): Promise<University> {
  const { data } = await apiClient.get<ApiResponse<University>>(
    `/universities/${id}`,
  );
  return data.data;
}

// GET /api/universities/generate-id (Admin only)
export async function reserveUniversityId(name?: string): Promise<string> {
  const { data } = await apiClient.get<ApiResponse<{ universityId: string }>>(
    "/universities/generate-id",
    { params: name ? { name } : undefined },
  );
  return data.data.universityId;
}

// POST /api/universities (Admin only)
export async function createUniversity(
  payload: Partial<University>,
): Promise<University> {
  const { data } = await apiClient.post<ApiResponse<University>>(
    "/universities",
    payload,
  );
  return data.data;
}

//PUT /api/universities/:id (Admin only)
export async function updateUniversity(
  id: string,
  payload: Partial<University>,
): Promise<University> {
  const { data } = await apiClient.put<ApiResponse<University>>(
    `/universities/${id}`,
    payload,
  );
  return data.data;
}

// PATCH /api/universities/:id/status (Admin only)
export async function updateUniversityStatus(
  id: string,
  status: UniversityStatus,
): Promise<University> {
  const { data } = await apiClient.patch<ApiResponse<University>>(
    `/universities/${id}/status`,
    { status },
  );
  return data.data;
}

// DELETE /api/universities/:id (Admin only)
export async function deleteUniversity(id: string): Promise<void> {
  await apiClient.delete(`/universities/${id}`);
}

