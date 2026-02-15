import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  summary: z.string().optional().default(""),
  highlights: z.array(z.string()).optional().default([]),
  tools: z.string(),
  projectLink: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const DEFAULT_PROJECT: Omit<Project, "id"> = {
  title: "",
  summary: "",
  highlights: [],
  tools: "",
  projectLink: "",
};
