import { z } from "zod";

export const HobbySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export const HobbiesSchema = z.array(HobbySchema);

export type Hobby = z.infer<typeof HobbySchema>;
export type Hobbies = z.infer<typeof HobbiesSchema>;

export const DEFAULT_HOBBY: Omit<Hobby, "id"> = {
  name: "",
  description: "",
};
