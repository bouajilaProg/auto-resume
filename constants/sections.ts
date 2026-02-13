import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  FolderGit2,
  Puzzle,
  Globe,
  Heart,
  LucideIcon,
} from "lucide-react";
import { SectionType } from "@/types/resumeTypes";

export const SECTION_ICONS: Record<string, LucideIcon> = {
  personalInfo: User,
  [SectionType.Education]: GraduationCap,
  [SectionType.WorkExperience]: Briefcase,
  [SectionType.Project]: FolderGit2,
  [SectionType.Skills]: Wrench,
  [SectionType.Certification]: Award,
  [SectionType.ExtraCurricular]: Puzzle,
  [SectionType.Languages]: Globe,
  [SectionType.Hobbies]: Heart,
};

export const SECTION_LABELS: Record<string, string> = {
  personalInfo: "Personal Info",
  [SectionType.Education]: "Education",
  [SectionType.WorkExperience]: "Experience",
  [SectionType.Project]: "Projects",
  [SectionType.Skills]: "Skills",
  [SectionType.Certification]: "Certifications",
  [SectionType.ExtraCurricular]: "Extra-Curricular",
  [SectionType.Languages]: "Languages",
  [SectionType.Hobbies]: "Hobbies",
};

export const SECTION_PATHS: Record<string, string> = {
  personalInfo: "personal-info",
  [SectionType.Education]: "education",
  [SectionType.WorkExperience]: "experience",
  [SectionType.Project]: "projects",
  [SectionType.Skills]: "skills",
  [SectionType.Certification]: "certifications",
  [SectionType.ExtraCurricular]: "extracurricular",
  [SectionType.Languages]: "languages",
  [SectionType.Hobbies]: "hobbies",
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
