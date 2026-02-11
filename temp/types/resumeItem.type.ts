import { Certification } from "./certif.type";
import { EducationItem } from "./education.type";
import { WorkExperience } from "./experience.type";
import { ExtraCurricularActivity } from "./extraCurr.type";
import { Hobbies } from "./hobbies.type";
import { Languages } from "./languages.type";
import { PersonalInfo } from "./personalInfo.type";
import { Project } from "./project.type";
import { Skills } from "./skills.type";

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
  template: string;
  lastUpdate: string;
  personalInfo?: PersonalInfo;

  sections: ResumeSection[];
}
