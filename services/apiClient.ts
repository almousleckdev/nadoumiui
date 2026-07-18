import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15_000,
});

const CSRF_COOKIE_NAME = "csrfToken";
const SAFE_METHODS = new Set(["get", "head", "options"]);

export function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

//Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Mirror the CSRF cookie (set by the backend, readable since it's
    // deliberately not httpOnly) into a header on mutating requests. The
    // backend rejects cookie-authenticated mutations without a matching
    // header — see core/middleware/csrf.js on the backend for the full
    // double-submit-cookie rationale.
    const method = config.method?.toLowerCase();
    if (method && !SAFE_METHODS.has(method)) {
      const csrfToken = readCookie(CSRF_COOKIE_NAME);
      if (csrfToken) {
        config.headers.set("X-CSRF-Token", csrfToken);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

//Response Interceptor: normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (typeof window !== "undefined") {
      const isAuthEndpoint = error.config?.url?.match(/login|register|forgot-password|reset-password/i);
      
      if (error.response?.status === 401 && !isAuthEndpoint) {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        toast.error("Session expired. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You do not have permission to perform this action.");
      } else if (error.response?.status && error.response.status >= 500) {
        toast.error("A server error occurred. Please try again later.");
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
