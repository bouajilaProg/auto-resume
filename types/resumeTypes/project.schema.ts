import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tools: z.string(),
  projectLink: z.string().optional(),
  repoLink: z.string().optional(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
