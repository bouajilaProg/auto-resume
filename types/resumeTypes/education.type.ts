// education Info
enum DegreeType {
  Bachelor = "BS",
  Master = "MS",
  PhD = "PhD"
}


interface EducationItem {
  id: number;
  degreeType: DegreeType;
  degreeName: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export type { EducationItem };
export { DegreeType };
