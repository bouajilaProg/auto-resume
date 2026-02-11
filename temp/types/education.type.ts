// education Info
const DEGREES = {
  BS: "Bachelor's Degree",
  MS: "Master's Degree",
  PhD: "PhD/Doctorate",
} as const;

type DegreeType = keyof typeof DEGREES;

interface EducationItem {
  id: number;
  degreeType: DegreeType;
  degreeName: string;
  description: string;
  institution: string;
  startDate: string;
  endDate: string;
  keySkills: string;
}

export type { EducationItem };
export { DEGREES };


