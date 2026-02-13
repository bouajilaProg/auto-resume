import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  FolderKanban,
  Trophy,
  Languages,
  Heart,
  LucideIcon,
} from "lucide-react";
import { SectionType } from "@/types/resumeTypes";

export const SECTION_ICONS: Record<string, LucideIcon> = {
  personalInfo: User,
  education: GraduationCap,
  work_experience: Briefcase,
  project: FolderKanban,
  projects: FolderKanban,
  skills: Wrench,
  certification: Award,
  certifications: Award,
  extracurricular: Trophy,
  languages: Languages,
  hobbies: Heart,
};

export const SECTION_LABELS: Record<string, string> = {
  personalInfo: "Personal Info",
  education: "Education",
  work_experience: "Experience",
  project: "Projects",
  projects: "Projects",
  skills: "Skills",
  certification: "Certifications",
  certifications: "Certifications",
  extracurricular: "Extracurricular",
  languages: "Languages",
  hobbies: "Hobbies",
};

export const SECTION_PATHS: Record<string, string> = {
  personalInfo: "personal-info",
  education: "education",
  work_experience: "experience",
  project: "projects",
  projects: "projects",
  skills: "skills",
  certification: "certifications",
  certifications: "certifications",
  extracurricular: "extracurricular",
  languages: "languages",
  hobbies: "hobbies",
};

export const ALL_SECTIONS = [
  "personalInfo",
  SectionType.Education,
  SectionType.Project,
  SectionType.WorkExperience,
  SectionType.Skills,
  SectionType.Certification,
  SectionType.ExtraCurricular,
  SectionType.Languages,
  SectionType.Hobbies,
] as const;
