import { z } from "zod";

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

export type SkillsSchemaType = z.infer<typeof SkillsSchema>;
