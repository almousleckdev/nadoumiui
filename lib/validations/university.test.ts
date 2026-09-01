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

  it("rejects a universityId shorter than 3 characters if provided as non-empty", () => {
    const result = universitySchema.safeParse({ ...validPayload, universityId: "AB" });
    expect(result.success).toBe(false);
  });

  it("accepts a payload without universityId or with empty string for auto-generation", () => {
    const { universityId, ...withoutId } = validPayload;
    const resultWithout = universitySchema.safeParse(withoutId);
    expect(resultWithout.success).toBe(true);

    const resultEmpty = universitySchema.safeParse({ ...validPayload, universityId: "" });
    expect(resultEmpty.success).toBe(true);
  });

  it("allows officialWebsite and admissionsEmail to be empty or null", () => {
    const empty = universitySchema.safeParse({ ...validPayload, officialWebsite: "", admissionsEmail: "" });
    expect(empty.success).toBe(true);

    const nullish = universitySchema.safeParse({ ...validPayload, officialWebsite: null, admissionsEmail: null });
    expect(nullish.success).toBe(true);
  });

  it("validates structured accommodation entries", () => {
    const result = universitySchema.safeParse({
      ...validPayload,
      accommodation: [{ type: "Double Room", pricePerYear: 4000, facilities: ["WiFi", "AC"] }],
    });
    expect(result.success).toBe(true);
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

  it("rejects a payload with a name shorter than 2 characters", () => {
    const result = universitySchema.safeParse({ ...validPayload, name: "A" });
    expect(result.success).toBe(false);
  });
});
