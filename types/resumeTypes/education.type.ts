// education Info
enum DegreeType {
  BS = "Bachelor's Degree",
  MS = "Master's Degree",
  PhD = "PhD/Doctorate"
}

interface EducationItem {
  id: number;
  degreeType: DegreeType;
  degreeName: string;
  institution: string;
  startDate: string;
  endDate: string;
  keySkills: string;
}

export type { EducationItem };
export { DegreeType };
