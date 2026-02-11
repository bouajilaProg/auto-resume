import { z } from "zod";
import { Mail, Phone, Globe, Github, Linkedin, LucideIcon } from "lucide-react";

export const CONTACT_TYPES = [
  "Email",
  "Phone",
  "Website",
  "GitHub",
  "LinkedIn",
] as const;

export const ContactType = {
  Email: "Email",
  Phone: "Phone",
  Website: "Website",
  GitHub: "GitHub",
  LinkedIn: "LinkedIn",
} as const;

export const contactIcons: Record<string, LucideIcon> = {
  Email: Mail,
  Phone: Phone,
  Website: Globe,
  GitHub: Github,
  LinkedIn: Linkedin,
};

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
