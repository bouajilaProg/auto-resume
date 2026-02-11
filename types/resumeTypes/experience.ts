import { z } from "zod";

export const WorkExperienceSchema = z.object({
  id: z.number(),
  jobTitle: z.string(),
  company: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  highlights: z.array(z.string()),
  keywords: z.string(),
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema>;

export const DEFAULT_EXPERIENCE: Omit<WorkExperience, "id"> = {
  jobTitle: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  highlights: [],
  keywords: "",
};
