import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.array(z.string()),
  description: z.string().optional().default(""),
  tools: z.string(),
  projectLink: z.string().optional(),
  repoLink: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const DEFAULT_PROJECT: Omit<Project, "id"> = {
  title: "",
  notes: [],
  description: "",
  tools: "",
  projectLink: "",
  repoLink: "",
};
