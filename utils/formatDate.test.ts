import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2026-03-15T00:00:00.000Z")).toBe("Mar 15, 2026");
  });

  it("formats a Date object", () => {
    expect(formatDate(new Date("2026-01-01T00:00:00.000Z"))).toBe("Jan 1, 2026");
  });

  it("returns an empty string for an empty input", () => {
    expect(formatDate("")).toBe("");
  });

  it("returns an empty string for an invalid date string", () => {
    expect(formatDate("not-a-date")).toBe("");
  });
});
