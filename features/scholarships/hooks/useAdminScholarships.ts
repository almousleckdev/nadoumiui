import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScholarships, deleteScholarship } from "@/services/scholarshipService";

export const ADMIN_SCHOLARSHIPS_QUERY_KEY = ["adminScholarships"];

export function useAdminScholarships(page: number, limit: number) {
  return useQuery({
    queryKey: [...ADMIN_SCHOLARSHIPS_QUERY_KEY, page, limit],
    queryFn: () => getScholarships({ page, limit }),
  });
}

export function useDeleteScholarship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScholarship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_SCHOLARSHIPS_QUERY_KEY });
    },
  });
}
