import { z } from "zod";

export const createShortUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .max(2048, "URL is too long"),

  expiresAt: z
    .string()
    .datetime()
    .optional(),
});