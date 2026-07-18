import apiClient from "./apiClient";
import type {
  Conversation,
  Message,
  ApiResponse,
  Admin,
} from "@/types";

// GET /api/messages/conversations
export async function getConversations(): Promise<Conversation[]> {
  const { data } = await apiClient.get<ApiResponse<Conversation[]>>(
    "/messages/conversations",
  );
  return data.data;
}

//POST /api/messages/conversations
export async function createConversation(
  adminId: string,
): Promise<Conversation> {
  const { data } = await apiClient.post<ApiResponse<Conversation>>(
    "/messages/conversations",
    { adminId },
  );
  return data.data;
}

// GET /api/messages/conversations/:conversationId/messages
export async function getMessages(
  conversationId: string,
): Promise<Message[]> {
  const { data } = await apiClient.get<ApiResponse<Message[]>>(
    `/messages/conversations/${conversationId}/messages`,
  );
  return data.data;
}

//POST /api/messages/send
export async function sendMessage(
  conversationId: string,
  content: string,
  type?: "text" | "image" | "file",
  fileInfo?: { url: string; name: string; size: string }
): Promise<Message> {
  const { data } = await apiClient.post<ApiResponse<Message>>(
    "/messages/send",
    { conversationId, content, type, fileInfo },
  );
  return data.data;
}

// POST /api/messages/conversations/:conversationId/upload
export async function uploadMessageFile(
  conversationId: string,
  file: File
): Promise<{ url: string; name: string; size: string; type: "image" | "file"; mimeType: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<{ url: string; name: string; size: string; type: "image" | "file"; mimeType: string }>>(
    `/messages/conversations/${conversationId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
}

//GET /api/messages/support-admins
export async function getSupportAdmins(): Promise<Admin[]> {
  const { data } = await apiClient.get<ApiResponse<Admin[]>>(
    "/messages/support-admins",
  );
  return data.data;
}
