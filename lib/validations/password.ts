import { z } from "zod";

/**
 * Mirrors the backend's password rule (core/validation/common.js `password()`
 * in nadoumibackend): min 8 chars, at least one uppercase, one lowercase, one
 * digit. Keeping these in sync avoids a password that passes every frontend
 * form field but gets rejected by the backend on submit.
 */
export const passwordRule = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number");
