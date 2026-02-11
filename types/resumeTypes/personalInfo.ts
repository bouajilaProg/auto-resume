import { z } from "zod";

export const CONTACT_TYPES = [
  "Email",
  "Phone",
  "Website",
  "GitHub",
  "LinkedIn",
] as const;

export const ContactTypeSchema = z.enum(CONTACT_TYPES);

export const ContactSchema = z.object({
  id: z.number(),
  type: ContactTypeSchema,
  value: z.string(),
});

export const PersonalInfoSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  contact: z.array(ContactSchema),
});

export type ContactType = (typeof CONTACT_TYPES)[number];
export type Contact = z.infer<typeof ContactSchema>;
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
