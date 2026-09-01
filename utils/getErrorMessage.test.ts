import { describe, it, expect } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import { getErrorMessage, getErrorStatus, isNetworkError } from "./getErrorMessage";

function makeAxiosError(status: number, data: unknown): AxiosError {
  return new AxiosError("Request failed", "ERR_BAD_REQUEST", undefined, undefined, {
    status,
    statusText: "Error",
    headers: {},
    config: { headers: new AxiosHeaders() },
    data,
  });
}

function makeNetworkError(): AxiosError {
  const err = new AxiosError("Network Error", "ERR_NETWORK");
  return err;
}

describe("getErrorMessage", () => {
  it("prefers the backend's { error: { message } } shape", () => {
    const error = makeAxiosError(400, { success: false, error: { message: "Invalid email or password" } });
    expect(getErrorMessage(error)).toBe("Invalid email or password");
  });

  it("falls back to a top-level data.message if present", () => {
    const error = makeAxiosError(400, { message: "Legacy shape message" });
    expect(getErrorMessage(error)).toBe("Legacy shape message");
  });

  it("returns clean status message for 500 when there's no response body message", () => {
    const error = makeAxiosError(500, {});
    expect(getErrorMessage(error)).toBe("A server error occurred. Please try again later.");
  });

  it("returns user-friendly connection message for ERR_NETWORK", () => {
    const error = makeNetworkError();
    expect(getErrorMessage(error)).toBe("Unable to connect to the server. Please verify your connection or check if the backend is running.");
  });

  it("handles a plain Error", () => {
    expect(getErrorMessage(new Error("Plain failure"))).toBe("Plain failure");
  });

  it("handles string error messages directly", () => {
    expect(getErrorMessage("Custom error string")).toBe("Custom error string");
  });

  it("supports a custom fallback message for unknown objects", () => {
    expect(getErrorMessage({}, "Custom fallback")).toBe("Custom fallback");
  });
});

describe("isNetworkError", () => {
  it("returns true for Axios ERR_NETWORK errors", () => {
    expect(isNetworkError(makeNetworkError())).toBe(true);
  });

  it("returns false for HTTP 400 responses", () => {
    expect(isNetworkError(makeAxiosError(400, {}))).toBe(false);
  });
});

describe("getErrorStatus", () => {
  it("returns the response status for an axios error", () => {
    expect(getErrorStatus(makeAxiosError(404, {}))).toBe(404);
  });

  it("returns undefined for a non-axios error", () => {
    expect(getErrorStatus(new Error("x"))).toBeUndefined();
  });
});
