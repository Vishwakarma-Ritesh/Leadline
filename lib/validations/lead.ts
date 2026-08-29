import { z } from "zod";

import { LEAD_STATUSES } from "@/types/lead";

const cleanText = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

export const createLeadSchema = z.object({
  name: cleanText("Name", 2, 80),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer.")
    .transform((value) => value.toLowerCase()),
  company: cleanText("Company", 2, 120),
  message: cleanText("Message", 10, 1000),
});

export const leadIdSchema = z.string().uuid("Invalid lead identifier.");

export const updateStatusSchema = z.object({
  id: leadIdSchema,
  status: z.enum(LEAD_STATUSES),
});

export const updateNoteSchema = z.object({
  id: leadIdSchema,
  note: z
    .string()
    .trim()
    .max(1000, "Note must be 1000 characters or fewer."),
});
