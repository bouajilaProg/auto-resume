import { z } from "zod";
import { Certification } from "./certif";
import { EducationItem } from "./education";
import { WorkExperience } from "./experience";
import { ExtraCurricularActivity } from "./extraCurr";
import { Hobbies } from "./hobbies";
import { Languages } from "./languages";
import { PersonalInfo } from "./personalInfo";
import { Project } from "./project";
import { Skills } from "./skills";

// 1. Define the possible section types as constants
export const SectionType = {
  Education: "education",
  Project: "project",
  WorkExperience: "work_experience",
  Skills: "skills",
  Certification: "certification",
  ExtraCurricular: "extracurricular",
  Hobbies: "hobbies",
  Languages: "languages",
} as const;

export const SectionTypeSchema = z.enum([
  "education",
  "project",
  "work_experience",
  "skills",
  "certification",
  "extracurricular",
  "hobbies",
  "languages",
]);

export type SectionTypeValue = typeof SectionType[keyof typeof SectionType];

export type ResumeSection =
  | { type: typeof SectionType.Education; body: EducationItem[] }
  | { type: typeof SectionType.Project; body: Project[] }
  | { type: typeof SectionType.WorkExperience; body: WorkExperience[] }
  | { type: typeof SectionType.Skills; body: Skills }
  | { type: typeof SectionType.Certification; body: Certification[] }
  | { type: typeof SectionType.ExtraCurricular; body: ExtraCurricularActivity[] }
  | { type: typeof SectionType.Hobbies; body: Hobbies }
  | { type: typeof SectionType.Languages; body: Languages };

export interface Resume {
  name: string;
  description: string;
  lastUpdate: string;
  personalInfo?: PersonalInfo;

  sections: ResumeSection[];
}
