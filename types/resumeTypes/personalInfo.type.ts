import { LucideIcon } from "lucide-react";
import {
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
  hobbies: string[];
}

export const contactIcons: Record<ContactType, LucideIcon | IconType> = {
  Email: Mail,
  Phone: Phone,
  Website: Globe,
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
};

