import { DEFAULT_EDUCATION } from "./education";
import { DEFAULT_PROJECT } from "./project";
import { DEFAULT_EXPERIENCE } from "./experience";
import { DEFAULT_SKILLS } from "./skills";
import { DEFAULT_CERTIFICATION } from "./certif";
import { DEFAULT_EXTRACURRICULAR } from "./extraCurr";
import { DEFAULT_HOBBY } from "./hobbies";
import { DEFAULT_LANGUAGE } from "./languages";
import { Resume, SectionTypeValue } from "./resumeItem";

export const SECTION_DEFAULTS: Record<SectionTypeValue, Record<string, unknown>> = {
  education: DEFAULT_EDUCATION,
  project: DEFAULT_PROJECT,
  work_experience: DEFAULT_EXPERIENCE,
  skills: DEFAULT_SKILLS,
  certification: DEFAULT_CERTIFICATION,
  extracurricular: DEFAULT_EXTRACURRICULAR,
  hobbies: DEFAULT_HOBBY,
  languages: DEFAULT_LANGUAGE,
};

export const DEFAULT_RESUME: Resume = {
  name: "",
  description: "",
  template: "basic-resume",
  lastUpdate: new Date().toLocaleDateString(),
  sections: [],
};
