import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveDocumentUrl } from "./resolveUrl";

describe("resolveDocumentUrl", () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = "https://nadoumibackend.up.railway.app/api";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });

  it("returns an empty string for a nullish path", () => {
    expect(resolveDocumentUrl(null)).toBe("");
    expect(resolveDocumentUrl(undefined)).toBe("");
    expect(resolveDocumentUrl("")).toBe("");
  });

  it("passes through an already-absolute URL unchanged", () => {
    expect(resolveDocumentUrl("https://res.cloudinary.com/x/y.pdf")).toBe(
      "https://res.cloudinary.com/x/y.pdf",
    );
    expect(resolveDocumentUrl("http://example.com/a.pdf")).toBe("http://example.com/a.pdf");
  });

  it("prefixes a relative path with the backend base URL (API suffix stripped)", () => {
    expect(resolveDocumentUrl("/uploads/file.pdf")).toBe(
      "https://nadoumibackend.up.railway.app/uploads/file.pdf",
    );
  });

  it("adds a leading slash to a relative path that's missing one", () => {
    expect(resolveDocumentUrl("uploads/file.pdf")).toBe(
      "https://nadoumibackend.up.railway.app/uploads/file.pdf",
    );
  });

  it("falls back to localhost:3002 when NEXT_PUBLIC_API_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    expect(resolveDocumentUrl("/uploads/file.pdf")).toBe("http://localhost:3002/uploads/file.pdf");
  });
});
