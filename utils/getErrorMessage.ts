import { isAxiosError } from "axios";

/**
 * Extracts a user-facing message from a caught error, preferring the
 * backend's own error message (ApiResponse's `error.message` shape) over the
 * generic axios/Error message. Centralizes what used to be a repeated
 * `(err as any).response?.data?.message || err.message` pattern across
 * several forms.
 */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (isAxiosError<{ message?: string; error?: { message?: string } }>(error)) {
    return error.response?.data?.error?.message ?? error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}

/** The HTTP status code of a caught error, if it's an axios error with a response. */
export function getErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}
