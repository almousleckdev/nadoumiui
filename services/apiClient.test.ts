import { describe, it, expect, beforeEach } from "vitest";
import { readCookie, apiClient } from "./apiClient";

describe("readCookie", () => {
  beforeEach(() => {
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name) document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  });

  it("returns undefined when the cookie isn't present", () => {
    expect(readCookie("csrfToken")).toBeUndefined();
  });

  it("reads a single cookie's value", () => {
    document.cookie = "csrfToken=abc123";
    expect(readCookie("csrfToken")).toBe("abc123");
  });

  it("picks the right cookie out of several", () => {
    document.cookie = "other=xyz";
    document.cookie = "csrfToken=abc123";
    expect(readCookie("csrfToken")).toBe("abc123");
  });

  it("URL-decodes the cookie value", () => {
    document.cookie = `csrfToken=${encodeURIComponent("a b/c")}`;
    expect(readCookie("csrfToken")).toBe("a b/c");
  });
});

describe("apiClient request interceptor (CSRF)", () => {
  beforeEach(() => {
    document.cookie.split(";").forEach((c) => {
      const name = c.split("=")[0].trim();
      if (name) document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  });

  it("attaches X-CSRF-Token on a mutating request when the cookie is present", async () => {
    document.cookie = "csrfToken=abc123";
    const requestInterceptor = (apiClient.interceptors.request as unknown as {
      handlers: Array<{ fulfilled: (config: import("axios").InternalAxiosRequestConfig) => import("axios").InternalAxiosRequestConfig }>;
    }).handlers[0].fulfilled;

    const config = await requestInterceptor({
      method: "post",
      headers: new (await import("axios")).AxiosHeaders(),
    } as import("axios").InternalAxiosRequestConfig);

    expect(config.headers.get("X-CSRF-Token")).toBe("abc123");
  });

  it("does not attach a CSRF header on a safe (GET) request", async () => {
    document.cookie = "csrfToken=abc123";
    const requestInterceptor = (apiClient.interceptors.request as unknown as {
      handlers: Array<{ fulfilled: (config: import("axios").InternalAxiosRequestConfig) => import("axios").InternalAxiosRequestConfig }>;
    }).handlers[0].fulfilled;

    const config = await requestInterceptor({
      method: "get",
      headers: new (await import("axios")).AxiosHeaders(),
    } as import("axios").InternalAxiosRequestConfig);

    expect(config.headers.get("X-CSRF-Token")).toBeFalsy();
  });
});
