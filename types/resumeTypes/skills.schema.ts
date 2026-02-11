import { z } from "zod";
import { skillType } from "./skills.type";

export const SkillTypeSchema = z.nativeEnum(skillType);

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
