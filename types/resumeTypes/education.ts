import { z } from "zod";

export const DEGREES = {
  BS: "Bachelor's Degree",
  MS: "Master's Degree",
  PhD: "PhD/Doctorate",
} as const;

export const DegreeType = {
  BS: "BS",
  MS: "MS",
  PhD: "PhD",
} as const;

export const EducationItemSchema = z.object({
  id: z.number(),
  degreeType: z.enum(["BS", "MS", "PhD"]),
  degreeName: z.string(),
  summary: z.string().optional().default(""),
  highlights: z.array(z.string()).optional().default([]),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  keySkills: z.string(),
});

export type EducationItem = z.infer<typeof EducationItemSchema>;
export type DegreeType = keyof typeof DEGREES;

export const DEFAULT_EDUCATION: Omit<EducationItem, "id"> = {
  degreeType: "BS",
  degreeName: "",
  summary: "",
  highlights: [],
  institution: "",
  startDate: "",
  endDate: "",
  keySkills: "",
};
