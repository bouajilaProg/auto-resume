import { z } from "zod";

export const CertificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  issuingOrganization: z.string(),
  issueDate: z.string(),
});

export type CertificationSchemaType = z.infer<typeof CertificationSchema>;
