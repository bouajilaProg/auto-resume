import { z } from "zod";

export const HobbySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export const HobbiesSchema = z.array(HobbySchema);

export type HobbiesSchemaType = z.infer<typeof HobbiesSchema>;
