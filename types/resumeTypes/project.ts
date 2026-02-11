import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  notes: z.array(z.string()),
  tools: z.string(),
  projectLink: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
