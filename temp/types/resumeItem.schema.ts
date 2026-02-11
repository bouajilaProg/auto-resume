import { z } from "zod";
import { PersonalInfoSchema } from "./personalInfo.schema";
import { EducationItemSchema } from "./education.schema";
import { ProjectSchema } from "./project.schema";
import { WorkExperienceSchema } from "./experience.schema";
import { SkillsSchema } from "./skills.schema";
import { CertificationSchema } from "./certif.schema";
import { ExtraCurricularActivitySchema } from "./extraCurr.schema";
import { HobbiesSchema } from "./hobbies.schema";
import { LanguagesSchema } from "./languages.schema";

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
  z.object({ type: z.literal("education"), body: z.array(EducationItemSchema) }),
  z.object({ type: z.literal("project"), body: z.array(ProjectSchema) }),
  z.object({ type: z.literal("work_experience"), body: z.array(WorkExperienceSchema) }),
  z.object({ type: z.literal("skills"), body: SkillsSchema }),
  z.object({ type: z.literal("certification"), body: z.array(CertificationSchema) }),
  z.object({ type: z.literal("extracurricular"), body: z.array(ExtraCurricularActivitySchema) }),
  z.object({ type: z.literal("hobbies"), body: HobbiesSchema }),
  z.object({ type: z.literal("languages"), body: LanguagesSchema }),
]);

export const ResumeSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.string(),
  lastUpdate: z.string(),
  personalInfo: PersonalInfoSchema.optional(),
  sections: z.array(ResumeSectionSchema),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
