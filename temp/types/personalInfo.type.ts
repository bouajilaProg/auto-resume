export const CONTACT_TYPES = [
  "Email",
  "Phone",
  "Website",
  "GitHub",
  "LinkedIn",
] as const;

export type ContactType = (typeof CONTACT_TYPES)[number];

export interface Contact {
  id: number;
  type: ContactType;
  value: string;
}

export interface PersonalInfo {
  name: string;
  location: string;
  description: string;
  contact: Contact[];
}

