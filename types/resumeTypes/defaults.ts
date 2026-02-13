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
  name: "My Resume",
  description: "New Resume",
  template: "basic-resume",
  lastUpdate: new Date().toLocaleDateString(),
  personalInfo: { name: "", location: "", description: "", contact: [] },
  sections: [
    { type: "education", body: [] },
    { type: "work_experience", body: [] },
    { type: "project", body: [] },
    { type: "skills", body: { languages: [], technologies: [], softSkills: [] } },
    { type: "certification", body: [] },
    { type: "extracurricular", body: [] },
    { type: "languages", body: [] },
    { type: "hobbies", body: [] },
  ],
};
