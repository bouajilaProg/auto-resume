import { z } from "zod";
import { DEGREES } from "./education.type";

export const DegreeTypeSchema = z.enum(Object.keys(DEGREES) as [string, ...string[]]);

export const EducationItemSchema = z.object({
  id: z.number(),
  degreeType: DegreeTypeSchema,
  degreeName: z.string(),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  keySkills: z.string(),
});

export type EducationItemSchemaType = z.infer<typeof EducationItemSchema>;
