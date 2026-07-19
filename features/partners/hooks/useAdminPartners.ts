import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPartners, deletePartner } from "@/services/partnerService";

export const ADMIN_PARTNERS_QUERY_KEY = ["adminPartners"];

export function useAdminPartners(page: number, limit: number) {
  return useQuery({
    queryKey: [...ADMIN_PARTNERS_QUERY_KEY, page, limit],
    queryFn: () => getPartners({ page, limit }),
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PARTNERS_QUERY_KEY });
    },
  });
}
