import { describe, it, expect } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import { getErrorMessage, getErrorStatus } from "./getErrorMessage";

function makeAxiosError(status: number, data: unknown): AxiosError {
  return new AxiosError("Request failed", "ERR_BAD_REQUEST", undefined, undefined, {
    status,
    statusText: "Error",
    headers: {},
    config: { headers: new AxiosHeaders() },
    data,
  });
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

  it("falls back to the axios error message when there's no response body message", () => {
    const error = makeAxiosError(500, {});
    expect(getErrorMessage(error)).toBe("Request failed");
  });

  it("handles a plain Error", () => {
    expect(getErrorMessage(new Error("Plain failure"))).toBe("Plain failure");
  });

  it("falls back to the default message for a non-Error value", () => {
    expect(getErrorMessage("just a string")).toBe("Something went wrong. Please try again.");
  });

  it("supports a custom fallback message", () => {
    expect(getErrorMessage("oops", "Custom fallback")).toBe("Custom fallback");
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
