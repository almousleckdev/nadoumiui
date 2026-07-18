import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminApplications,
  updateApplicationStatus,
  uploadAdminDocument,
} from "@/services/applicationService";
import type { ApplicationStatus, ApplicationFilters } from "@/types";

export const ADMIN_APPLICATIONS_QUERY_KEY = ["adminApplications"];

export function useAdminApplications(filters: ApplicationFilters) {
  return useQuery({
    queryKey: [...ADMIN_APPLICATIONS_QUERY_KEY, filters],
    queryFn: () => getAdminApplications(filters),
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      metadata,
    }: {
      id: string;
      status: ApplicationStatus;
      metadata?: Record<string, unknown>;
    }) => updateApplicationStatus(id, status, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_APPLICATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
    },
  });
}

export function useUploadAdminDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      type,
      file,
    }: {
      id: string;
      type: "admission" | "jw202";
      file: File;
    }) => uploadAdminDocument(id, type, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_APPLICATIONS_QUERY_KEY });
    },
  });
}
