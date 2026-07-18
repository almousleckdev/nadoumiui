import { useQuery } from "@tanstack/react-query";
import { getStudentApplications } from "@/services/applicationService";
import type { Application } from "@/types";

export const STUDENT_APPLICATIONS_QUERY_KEY = ["studentApplications"];

export function useStudentApplications() {
  return useQuery<Application[]>({
    queryKey: STUDENT_APPLICATIONS_QUERY_KEY,
    queryFn: getStudentApplications,
  });
}
