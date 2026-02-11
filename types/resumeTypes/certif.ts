import { z } from "zod";

export const CertificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  issuingOrganization: z.string(),
  issueDate: z.string(),
});

export type Certification = z.infer<typeof CertificationSchema>;

export const DEFAULT_CERTIFICATION: Omit<Certification, "id"> = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
};
