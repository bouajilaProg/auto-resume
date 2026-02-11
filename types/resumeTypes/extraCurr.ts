import { z } from "zod";

export const ExtraCurricularActivitySchema = z.object({
  id: z.number(),
  activityName: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export type ExtraCurricularActivity = z.infer<typeof ExtraCurricularActivitySchema>;

export const DEFAULT_EXTRACURRICULAR: Omit<ExtraCurricularActivity, "id"> = {
  activityName: "",
  startDate: "",
  endDate: "",
};
