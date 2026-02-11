import { z } from "zod";

export const ExtraCurricularActivitySchema = z.object({
  id: z.number(),
  activityName: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
});

export type ExtraCurricularActivitySchemaType = z.infer<typeof ExtraCurricularActivitySchema>;
