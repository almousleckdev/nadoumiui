import { describe, it, expect } from "vitest";
import { scholarshipSchema } from "./scholarship";

const validPayload = {
  title: "Chinese Government Scholarship",
  description: "A full scholarship covering tuition and living expenses.",
  programCategories: ["Bachelor"],
  scholarshipCategory: "CSC",
  applicationDeadline: "2027-06-01",
  teachingLanguage: "English",
  availableSlots: 5,
  status: "published",
};

describe("scholarshipSchema", () => {
  it("accepts a valid minimal payload", () => {
    const result = scholarshipSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects a title shorter than 3 characters", () => {
    const result = scholarshipSchema.safeParse({ ...validPayload, title: "AB" });
    expect(result.success).toBe(false);
  });

  it("rejects a description shorter than 10 characters", () => {
    const result = scholarshipSchema.safeParse({ ...validPayload, description: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects ageMin greater than ageMax", () => {
    const result = scholarshipSchema.safeParse({ ...validPayload, ageMin: 30, ageMax: 20 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("ageMin");
    }
  });

  it("accepts ageMin equal to ageMax", () => {
    const result = scholarshipSchema.safeParse({ ...validPayload, ageMin: 25, ageMax: 25 });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown scholarshipCategory value", () => {
    const result = scholarshipSchema.safeParse({ ...validPayload, scholarshipCategory: "NotAReal Category" });
    expect(result.success).toBe(false);
  });

  it("coerces numeric-string fee fields to numbers", () => {
    const result = scholarshipSchema.safeParse({
      ...validPayload,
      originalTuitionFee: "45000",
      availableSlots: "3",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.originalTuitionFee).toBe(45000);
      expect(result.data.availableSlots).toBe(3);
    }
  });

  it("accepts free-text values for the JSON-backed textarea fields", () => {
    // These fields are rendered as plain <textarea> inputs in ScholarshipForm,
    // not structured objects — the schema must accept whatever string a user
    // types, not reject it as a validation failure.
    const result = scholarshipSchema.safeParse({
      ...validPayload,
      stipend: "2500 RMB/month for living expenses",
      requirements: "Bachelor's degree, IELTS 6.0+",
      benefits: "Free dorm, waived tuition",
      applicationDocuments: "Passport copy, transcripts, recommendation letters",
    });
    expect(result.success).toBe(true);
  });

  it("requires an application deadline", () => {
    const rest: Record<string, unknown> = { ...validPayload };
    delete rest.applicationDeadline;
    const result = scholarshipSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});
