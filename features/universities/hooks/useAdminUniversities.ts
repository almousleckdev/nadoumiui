import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUniversities, deleteUniversity } from "@/services/universityService";

export const ADMIN_UNIVERSITIES_QUERY_KEY = ["adminUniversities"];

export function useAdminUniversities(page: number, limit: number) {
  return useQuery({
    queryKey: [...ADMIN_UNIVERSITIES_QUERY_KEY, page, limit],
    queryFn: () => getUniversities({ page, limit }),
  });
}

export function useDeleteUniversity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_UNIVERSITIES_QUERY_KEY });
    },
  });
}
