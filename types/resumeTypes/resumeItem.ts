import { z } from "zod";
import { PersonalInfoSchema } from "./personalInfo";
import { EducationItemSchema } from "./education";
import { ProjectSchema } from "./project";
import { WorkExperienceSchema } from "./experience";
import { SkillsSchema } from "./skills";
import { CertificationSchema } from "./certif";
import { ExtraCurricularActivitySchema } from "./extraCurr";
import { HobbiesSchema } from "./hobbies";
import { LanguagesSchema } from "./languages";

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

export const ResumeSectionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("education"), body: z.array(EducationItemSchema), enabled: z.boolean().optional() }),
  z.object({ type: z.literal("project"), body: z.array(ProjectSchema), enabled: z.boolean().optional() }),
  z.object({ type: z.literal("work_experience"), body: z.array(WorkExperienceSchema), enabled: z.boolean().optional() }),
  z.object({ type: z.literal("skills"), body: SkillsSchema, enabled: z.boolean().optional() }),
  z.object({ type: z.literal("certification"), body: z.array(CertificationSchema), enabled: z.boolean().optional() }),
  z.object({ type: z.literal("extracurricular"), body: z.array(ExtraCurricularActivitySchema), enabled: z.boolean().optional() }),
  z.object({ type: z.literal("hobbies"), body: HobbiesSchema, enabled: z.boolean().optional() }),
  z.object({ type: z.literal("languages"), body: LanguagesSchema, enabled: z.boolean().optional() }),
]);

export const ResumeSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.string(),
  lastUpdate: z.string(),
  personalInfo: PersonalInfoSchema.optional(),
  sections: z.array(ResumeSectionSchema),
});

export type SectionTypeValue = (typeof SectionType)[keyof typeof SectionType];
export type ResumeSection = z.infer<typeof ResumeSectionSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

