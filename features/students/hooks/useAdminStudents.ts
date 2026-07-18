import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllStudents } from "@/services/adminService";
import { createConversation } from "@/services/messageService";

export const ADMIN_STUDENTS_QUERY_KEY = ["adminStudentsList"];

export function useAdminStudents(page: number, limit: number) {
  return useQuery({
    queryKey: [...ADMIN_STUDENTS_QUERY_KEY, page, limit],
    queryFn: () => getAllStudents(page, limit),
  });
}

export function useCreateChat() {
  return useMutation({
    mutationFn: (studentId: string) => createConversation(studentId),
  });
}
