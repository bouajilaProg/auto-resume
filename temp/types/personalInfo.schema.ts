import { z } from "zod";
import { CONTACT_TYPES } from "./personalInfo.type";

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

export type PersonalInfoSchemaType = z.infer<typeof PersonalInfoSchema>;
