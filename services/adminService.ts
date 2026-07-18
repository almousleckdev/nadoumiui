import apiClient from "./apiClient";
import type {
  DashboardStats,
  AuditLog,
  ApiResponse,
} from "@/types";

//GET /api/admin/stats
export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await apiClient.get<ApiResponse<DashboardStats>>(
    "/admin/stats",
  );
  return data.data;
}

//GET /api/admin/audit-feed
export async function getAuditFeed(
  page = 1,
  limit = 50,
): Promise<AuditLog[]> {
  const { data } = await apiClient.get<ApiResponse<AuditLog[]>>(
    "/admin/audit-feed",
    { params: { page, limit } },
  );
  return data.data;
}

//GET /api/students (admin: list all students)
export async function getAllStudents(
  page = 1,
  limit = 8,
): Promise<{
  students: Array<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    createdAt: string;
    passportNumber?: string;
    phone?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    applications?: Array<{
      id: string;
      applicationId: string;
      status: string;
      submittedAt: string;
      scholarship?: {
        title: string;
      } | null;
    }>;
  }>;
  total: number;
}> {
  const { data } = await apiClient.get<ApiResponse<{
    students: Array<{
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      country: string;
      createdAt: string;
      passportNumber?: string;
      phone?: string | null;
      dateOfBirth?: string | null;
      gender?: string | null;
      applications?: Array<{
        id: string;
        applicationId: string;
        status: string;
        submittedAt: string;
        scholarship?: {
          title: string;
        } | null;
      }>;
    }>;
    total: number;
  }>>(
    "/students",
    { params: { page, limit } },
  );
  return data.data;
}
