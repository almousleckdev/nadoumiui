import apiClient from "./apiClient";
import type {
  Application,
  ApplicationFilters,
  ApplicationStatus,
  ApiResponse,
} from "@/types";

interface ApplicationsListResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

//GET /api/applications/student/me
export async function getStudentApplications(): Promise<Application[]> {
  const { data } = await apiClient.get<ApiResponse<Application[]>>(
    "/applications/student/me",
  );
  return data.data;
}

//GET /api/applications/student/me/:id
export async function getStudentApplicationById(
  id: string,
): Promise<Application> {
  const { data } = await apiClient.get<ApiResponse<Application>>(
    `/applications/student/me/${id}`,
  );
  return data.data;
}

//POST /api/applications/student/me
export async function submitApplication(
  scholarshipId: string,
  payload: Record<string, unknown>,
): Promise<Application> {
  const { data } = await apiClient.post<ApiResponse<Application>>(
    "/applications/student/me",
    { scholarshipId, ...payload },
  );
  return data.data;
}

//Admin-facing endpoints
//GET /api/applications (admin)
export async function getAdminApplications(
  filters?: ApplicationFilters,
): Promise<ApplicationsListResponse> {
  const params: Record<string, string | number> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.scholarshipId) params.scholarshipId = filters.scholarshipId;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  const { data } = await apiClient.get<ApiResponse<ApplicationsListResponse>>(
    "/applications",
    { params },
  );
  return data.data;
}

//PUT /api/applications/:id/status (admin)
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  metadata?: Record<string, unknown>,
): Promise<Application> {
  const { data } = await apiClient.put<ApiResponse<Application>>(
    `/applications/${id}/status`,
    { status, metadata },
  );
  return data.data;
}

//PUT /api/applications/:id/admin-documents (admin)
export async function uploadAdminDocument(
  id: string,
  documentType: "admission" | "jw202",
  file: File,
): Promise<Application> {
  const formData = new FormData();
  formData.append("documentType", documentType);
  formData.append("file", file);

  const { data } = await apiClient.put<ApiResponse<Application>>(
    `/applications/${id}/admin-documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
}
