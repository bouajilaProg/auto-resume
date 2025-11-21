import { Certification } from "./certif.type";
import { EducationItem } from "./education.type";
import { WorkExperience } from "./experience.type";
import { ExtraCurricularActivity } from "./extraCurr.type";
import { PersonalInfo } from "./personalInfo.type";
import { Project } from "./project.type";
import { Skills } from "./skills.type";

export interface Resume {
  name: string;
  description: string;
  template: string;
  lastUpdate: string;

  personalInfo: PersonalInfo;
  educations: EducationItem[];
  projects: Project[];
  experiences: WorkExperience[];
  skills: Skills;

  certifications?: Certification[];
  extracurriculars?: ExtraCurricularActivity[];
}
