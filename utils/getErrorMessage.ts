import { isAxiosError } from "axios";

export function isNetworkError(error: unknown): boolean {
  if (isAxiosError(error)) {
    return (
      !error.response ||
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      error.code === "ECONNREFUSED" ||
      error.message?.includes("Network Error") ||
      error.message?.includes("ECONNREFUSED")
    );
  }
  if (error instanceof Error) {
    return (
      error.message?.includes("Network Error") ||
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("ECONNREFUSED")
    );
  }
  return false;
}

export function getErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (isAxiosError<{ message?: string; error?: { message?: string; code?: string } }>(error)) {
    // 1. Backend error payload: { error: { message: "..." } } or { message: "..." }
    const backendMessage =
      error.response?.data?.error?.message ?? error.response?.data?.message;
    if (backendMessage && typeof backendMessage === "string" && backendMessage.trim()) {
      return backendMessage;
    }

    // 2. HTTP Status specific clean messages
    const status = error.response?.status;
    if (status === 400) return "Invalid request. Please check the entered data.";
    if (status === 401) return "Authentication required. Please log in again.";
    if (status === 403) return "You do not have permission to perform this action.";
    if (status === 404) return "The requested resource was not found.";
    if (status === 409) return "A conflict occurred with existing data. Please review your input.";
    if (status === 422) return "Validation failed. Please verify all required fields.";
    if (status === 429) return "Too many requests. Please wait a moment and try again.";
    if (status === 502 || status === 503 || status === 504) {
      return "Backend service is temporarily unavailable. Please try again shortly.";
    }
    if (status && status >= 500) {
      return "A server error occurred. Please try again later.";
    }

    // 3. Network / Connection errors (ERR_CONNECTION_REFUSED, ECONNREFUSED, offline)
    if (isNetworkError(error)) {
      if (error.code === "ECONNABORTED") {
        return "Request timed out. Please check your internet connection.";
      }
      return "Unable to connect to the server. Please verify your connection or check if the backend is running.";
    }

    if (error.message && error.message !== "Network Error") {
      return error.message;
    }
  }

  if (error instanceof Error) {
    if (isNetworkError(error)) {
      return "Unable to connect to the server. Please verify your connection or check if the backend is running.";
    }
    return error.message || fallback;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return fallback;
}
