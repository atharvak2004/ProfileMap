import { z } from "zod";

// Base schema for profile data
export const insertProfileSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  description: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional(),
  socialMedia: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional()
  }).optional()
});