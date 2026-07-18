import apiClient from "./apiClient";
import type {
  Scholarship,
  ScholarshipFilters,
  ApiResponse,
  ScholarshipStatus,
} from "@/types";

interface ScholarshipsListResponse {
  scholarships: Scholarship[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// GET /api/scholarships
export async function getScholarships(
  filters?: ScholarshipFilters,
): Promise<ScholarshipsListResponse> {
  const params: Record<string, string | number | boolean> = {};
  if (filters?.search) params.search = filters.search;
  if (filters?.programCategory) params.programCategory = filters.programCategory;
  if (filters?.scholarshipCategory) params.scholarshipCategory = filters.scholarshipCategory;
  if (filters?.teachingLanguage) params.teachingLanguage = filters.teachingLanguage;
  if (filters?.isTop !== undefined) params.isTop = filters.isTop;
  if (filters?.isRecommended !== undefined) params.isRecommended = filters.isRecommended;
  if (filters?.status) params.status = filters.status;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  const { data } = await apiClient.get<ApiResponse<ScholarshipsListResponse>>(
    "/scholarships",
    { params },
  );
  return data.data;
}

// GET /api/scholarships/featured
export async function getFeaturedScholarships(): Promise<Scholarship[]> {
  const { data } = await apiClient.get<ApiResponse<Scholarship[]>>(
    "/scholarships/featured",
  );
  return data.data;
}

// GET /api/scholarships/:id
export async function getScholarshipById(id: string): Promise<Scholarship> {
  const { data } = await apiClient.get<ApiResponse<Scholarship>>(
    `/scholarships/${id}`,
  );
  return data.data;
}

// POST /api/scholarships (Admin only)
export async function createScholarship(
  payload: Partial<Scholarship>,
): Promise<Scholarship> {
  const { data } = await apiClient.post<ApiResponse<Scholarship>>(
    "/scholarships",
    payload,
  );
  return data.data;
}

// PUT /api/scholarships/:id (Admin only)
export async function updateScholarship(
  id: string,
  payload: Partial<Scholarship>,
): Promise<Scholarship> {
  const { data } = await apiClient.put<ApiResponse<Scholarship>>(
    `/scholarships/${id}`,
    payload,
  );
  return data.data;
}

// PATCH /api/scholarships/:id/status (Admin only)
export async function updateScholarshipStatus(
  id: string,
  status: ScholarshipStatus,
): Promise<Scholarship> {
  const { data } = await apiClient.patch<ApiResponse<Scholarship>>(
    `/scholarships/${id}/status`,
    { status },
  );
  return data.data;
}

// DELETE /api/scholarships/:id (Admin only)
export async function deleteScholarship(id: string): Promise<void> {
  await apiClient.delete(`/scholarships/${id}`);
}

