import { z } from "zod";

export const WorkExperienceSchema = z.object({
  id: z.number(),
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  summary: z.string(),
  keywords: z.string(),
});

export type WorkExperienceSchemaType = z.infer<typeof WorkExperienceSchema>;
