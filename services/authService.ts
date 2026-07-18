import apiClient from "./apiClient";
import type {
  LoginCredentials,
  RegisterPayload,
  AuthResponse,
  ApiResponse,
  Student,
  Admin,
} from "@/types";



//POST /api/students/login
export async function loginStudent(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/students/login",
    credentials,
  );
  return data.data;
}

//POST /api/students/register
export async function registerStudent(
  payload: RegisterPayload,
): Promise<{ student: Student }> {
  const { data } = await apiClient.post<ApiResponse<{ student: Student }>>(
    "/students/register",
    payload,
  );
  return data.data;
}

// POST /api/students/verify-email
export async function verifyEmail(
  email: string,
  otp: string,
): Promise<void> {
  await apiClient.post("/students/verify-email", { email, otp });
}

// POST /api/students/resend-otp
export async function resendOTP(email: string): Promise<void> {
  await apiClient.post("/students/resend-otp", { email });
}

// GET /api/students/me
export async function getStudentProfile(): Promise<Student> {
  const { data } = await apiClient.get<ApiResponse<Student>>("/students/me");
  return data.data;
}

// PUT /api/students/me
export async function updateStudentProfile(
  payload: Partial<Student>,
): Promise<Student> {
  const { data } = await apiClient.put<ApiResponse<Student>>(
    "/students/me",
    payload,
  );
  return data.data;
}

// POST /api/admin/login
export async function loginAdmin(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/admin/login",
    credentials,
  );
  return data.data;
}

// GET /api/admin/me
export async function getAdminProfile(): Promise<Admin> {
  const { data } = await apiClient.get<ApiResponse<Admin>>("/admin/me");
  return data.data;
}

export async function logoutAdmin(): Promise<void> {
  await apiClient.delete("/admin/logout");
}

// PUT /api/admin/me
export async function updateAdminProfile(
  payload: Partial<Admin>,
): Promise<Admin> {
  const { data } = await apiClient.put<ApiResponse<Admin>>(
    "/admin/me",
    payload,
  );
  return data.data;
}

// POST /api/admin/me/profile-picture
export async function updateAdminProfilePicture(
  file: File,
): Promise<{ profilePicture: string }> {
  const formData = new FormData();
  formData.append("profilePicture", file);
  const { data } = await apiClient.post<ApiResponse<{ profilePicture: string }>>(
    "/admin/me/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data.data;
}

// POST /api/admin/me/password
export async function changeAdminPassword(
  payload: Record<string, string>,
): Promise<void> {
  await apiClient.post("/admin/me/password", payload);
}


// POST /api/students/forgot-password
export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/students/forgot-password", { email });
}

// POST /api/students/reset-password
export async function resetPassword(
  otp: string,
  password: string,
): Promise<void> {
  await apiClient.post("/students/reset-password", { otp, password });
}

// POST /api/students/me/password
export async function changeStudentPassword(
  payload: Record<string, string>,
): Promise<void> {
  await apiClient.post("/students/me/password", payload);
}

// POST /api/students/me/profile-picture
export async function updateProfilePicture(file: File): Promise<{ profilePicture: string }> {
  const formData = new FormData();
  formData.append("profilePicture", file);
  
  const { data } = await apiClient.post<{ data: { profilePicture: string } }>(
    "/students/me/profile-picture", 
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
}

export async function logoutStudent(): Promise<void> {
  //To make sure the backend handles cookie clearing
  await apiClient.delete("/students/logout"); 
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
