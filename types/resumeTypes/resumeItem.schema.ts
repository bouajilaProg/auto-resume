import { z } from "zod";
import { PersonalInfoSchema } from "./personalInfo.schema";
import { EducationItemSchema } from "./education.schema";
import { ProjectSchema } from "./project.schema";
import { WorkExperienceSchema } from "./experience.schema";
import { SkillsSchema } from "./skills.schema";
import { CertificationSchema } from "./certif.schema";
import { ExtraCurricularActivitySchema } from "./extraCurr.schema";

export const ResumeSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.string(),
  lastUpdate: z.string(),

  personalInfo: PersonalInfoSchema,
  educations: z.array(EducationItemSchema),
  projects: z.array(ProjectSchema),
  experiences: z.array(WorkExperienceSchema),
  skills: SkillsSchema,

  certifications: z.array(CertificationSchema).optional(),
  extracurriculars: z.array(ExtraCurricularActivitySchema).optional(),
});

export type ResumeSchemaType = z.infer<typeof ResumeSchema>;
