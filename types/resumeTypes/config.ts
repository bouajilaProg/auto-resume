import { z } from "zod";
import { SectionTypeSchema } from "./resumeItem";

export const ResumeConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  lastUpdate: z.string().optional(),
  sectionOrder: z.array(SectionTypeSchema),
  selectedItems: z.object({
    personalInfo: z.array(z.number()),
    education: z.array(z.number()),
    work_experience: z.array(z.number()),
    project: z.array(z.number()),
    certification: z.array(z.number()),
    extracurricular: z.array(z.number()),
    hobbies: z.array(z.number()),
    languages: z.array(z.number()),
    skills: z.object({
      languages: z.array(z.number()),
      technologies: z.array(z.number()),
      softSkills: z.array(z.number()),
    }),
  }),
  itemOrder: z.object({
    personalInfo: z.array(z.number()),
    education: z.array(z.number()),
    work_experience: z.array(z.number()),
    project: z.array(z.number()),
    certification: z.array(z.number()),
    extracurricular: z.array(z.number()),
    hobbies: z.array(z.number()),
    languages: z.array(z.number()),
    skills: z.object({
      languages: z.array(z.number()),
      technologies: z.array(z.number()),
      softSkills: z.array(z.number()),
    }),
  }).optional(),
});

export type ResumeConfig = z.infer<typeof ResumeConfigSchema>;

export const DEFAULT_CONFIG: ResumeConfig = {
  id: "default",
  name: "Standard Resume",
  description: "A standard resume with default sections.",
  lastUpdate: new Date().toLocaleDateString(),
  sectionOrder: [
    "education",
    "work_experience",
    "project",
    "skills",
    "certification",
    "extracurricular",
    "languages",
    "hobbies",
  ],
  selectedItems: {
    personalInfo: [],
    education: [],
    work_experience: [],
    project: [],
    certification: [],
    extracurricular: [],
    hobbies: [],
    languages: [],
    skills: {
      languages: [],
      technologies: [],
      softSkills: [],
    },
  },
  itemOrder: {
    personalInfo: [],
    education: [],
    work_experience: [],
    project: [],
    certification: [],
    extracurricular: [],
    hobbies: [],
    languages: [],
    skills: {
      languages: [],
      technologies: [],
      softSkills: [],
    },
  },
};
