import { z } from "zod";

export const SKILL_TYPES = {
  LANG: "languages",
  TECH: "technologies",
  SOFT: "softSkills",
} as const;

export const SkillTypeSchema = z.enum(["LANG", "TECH", "SOFT"]);

export const SkillItemSchema = z.object({
  id: z.number(),
  type: SkillTypeSchema,
  name: z.string(),
});

export const SkillsSchema = z.object({
  languages: z.array(SkillItemSchema),
  technologies: z.array(SkillItemSchema),
  softSkills: z.array(SkillItemSchema),
});

export type SkillType = z.infer<typeof SkillTypeSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
