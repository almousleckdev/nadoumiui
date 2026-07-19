import apiClient from "./apiClient";
import type { Program, ProgramFilters, ApiResponse } from "@/types";

interface ProgramsListResponse {
  programs: Program[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// GET /api/programs
export async function getPrograms(filters?: ProgramFilters): Promise<ProgramsListResponse> {
  const params: Record<string, string | number> = {};
  if (filters?.search) params.search = filters.search;
  if (filters?.category) params.category = filters.category;
  if (filters?.teachingLanguage) params.teachingLanguage = filters.teachingLanguage;
  if (filters?.field) params.field = filters.field;
  if (filters?.tuitionMin !== undefined) params.tuitionMin = filters.tuitionMin;
  if (filters?.tuitionMax !== undefined) params.tuitionMax = filters.tuitionMax;
  if (filters?.sort) params.sort = filters.sort;
  if (filters?.page) params.page = filters.page;
  if (filters?.limit) params.limit = filters.limit;

  const { data } = await apiClient.get<ApiResponse<ProgramsListResponse>>("/programs", { params });
  return data.data;
}

// GET /api/programs/featured
export async function getFeaturedPrograms(): Promise<Program[]> {
  const { data } = await apiClient.get<ApiResponse<Program[]>>("/programs/featured");
  return data.data;
}

// GET /api/programs/categories
export async function getProgramCategories(): Promise<string[]> {
  const { data } = await apiClient.get<ApiResponse<string[]>>("/programs/categories");
  return data.data;
}

// GET /api/programs/:id
export async function getProgramById(id: string): Promise<Program> {
  const { data } = await apiClient.get<ApiResponse<Program>>(`/programs/${id}`);
  return data.data;
}
