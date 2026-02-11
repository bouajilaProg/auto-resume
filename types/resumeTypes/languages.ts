import { z } from "zod";

export const PROFICIENCY_LEVELS = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Beginner",
] as const;

export const ProficiencyLevelSchema = z.enum(PROFICIENCY_LEVELS);

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  proficiency: ProficiencyLevelSchema.optional(),
});

export const LanguagesSchema = z.array(LanguageSchema);

export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number];
export type Language = z.infer<typeof LanguageSchema>;
export type Languages = z.infer<typeof LanguagesSchema>;
