import apiClient from "./apiClient";
import type { ApiResponse } from "@/types";

export interface UploadResponse {
  url: string;
  name: string;
  size: string;
  type: string;
  publicId: string;
}

//Uploads a file
export async function uploadMediaAsset(file: File, folder?: string): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) {
    formData.append("folder", folder);
  }

  const { data } = await apiClient.post<ApiResponse<UploadResponse>>(
    "/media/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
}
