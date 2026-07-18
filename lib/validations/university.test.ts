import { describe, it, expect } from "vitest";
import { universitySchema } from "./university";

const validPayload = {
  universityId: "UNI-001",
  name: "Peking University",
  type: "Public",
  status: "active",
};

describe("universitySchema", () => {
  it("accepts a valid minimal payload", () => {
    const result = universitySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a universityId shorter than 3 characters", () => {
    const result = universitySchema.safeParse({ ...validPayload, universityId: "AB" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid university type", () => {
    const result = universitySchema.safeParse({ ...validPayload, type: "Community College" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid officialWebsite URL but allows an empty string", () => {
    const invalid = universitySchema.safeParse({ ...validPayload, officialWebsite: "not-a-url" });
    expect(invalid.success).toBe(false);

    const empty = universitySchema.safeParse({ ...validPayload, officialWebsite: "" });
    expect(empty.success).toBe(true);
  });

  it("rejects an invalid admissionsEmail but allows an empty string", () => {
    const invalid = universitySchema.safeParse({ ...validPayload, admissionsEmail: "not-an-email" });
    expect(invalid.success).toBe(false);

    const empty = universitySchema.safeParse({ ...validPayload, admissionsEmail: "" });
    expect(empty.success).toBe(true);
  });

  it("validates structured accommodation entries", () => {
    const result = universitySchema.safeParse({
      ...validPayload,
      accommodation: [{ type: "Double Room", pricePerYear: 4000, facilities: ["WiFi", "AC"] }],
    });
    expect(result.success).toBe(true);
  });

  it("rejects an accommodation entry missing its required type field", () => {
    const result = universitySchema.safeParse({
      ...validPayload,
      accommodation: [{ pricePerYear: 4000 }],
    });
    expect(result.success).toBe(false);
  });

  it("coerces numeric-string metric fields", () => {
    const result = universitySchema.safeParse({
      ...validPayload,
      foundedYear: "1898",
      totalStudents: "45000",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.foundedYear).toBe(1898);
      expect(result.data.totalStudents).toBe(45000);
    }
  });
});
