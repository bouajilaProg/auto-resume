import { z } from "zod";
import { PROFICIENCY_LEVELS } from "./languages.type";

export const ProficiencyLevelSchema = z.enum(PROFICIENCY_LEVELS);

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  proficiency: ProficiencyLevelSchema.optional(),
});

export const LanguagesSchema = z.array(LanguageSchema);

export type LanguagesSchemaType = z.infer<typeof LanguagesSchema>;
