import { z } from "zod";

export const EducationItemSchema = z.object({
  id: z.number(),
  degreeType: z.enum(["BS", "MS", "PhD"]),
  degreeName: z.string(),
  description: z.string(),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  keySkills: z.string(),
});

export type EducationItemSchemaType = z.infer<typeof EducationItemSchema>;
