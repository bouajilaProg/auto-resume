import type {
  Certification,
  EducationItem,
  WorkExperience,
  ExtraCurricularActivity,
  Hobby,
  Language,
  Project,
  Skills,
  Resume,
  SectionTypeValue,
} from "bouajila-resume-generator";

// ── Display labels for degree types (not exported by the package) ──
export const DEGREES = {
  BS: "Bachelor's Degree",
  MS: "Master's Degree",
  PhD: "PhD/Doctorate",
} as const;

// ── Skill-type mapping used in the UI ──
export const skillType = {
  LANG: "languages",
  TECH: "technologies",
  SOFT: "softSkills",
} as const;

// ── Per-section defaults ──

export const DEFAULT_CERTIFICATION: Omit<Certification, "id"> = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
};

export const DEFAULT_EDUCATION: Omit<EducationItem, "id"> = {
  degreeType: "BS",
  degreeName: "",
  summary: "",
  highlights: [],
  institution: "",
  startDate: "",
  endDate: "",
  keySkills: "",
};

export const DEFAULT_EXPERIENCE: Omit<WorkExperience, "id"> = {
  jobTitle: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  highlights: [],
  summary: "",
  keywords: "",
};

export const DEFAULT_EXTRACURRICULAR: Omit<ExtraCurricularActivity, "id"> = {
  activityName: "",
  startDate: "",
  endDate: "",
};

export const DEFAULT_HOBBY: Omit<Hobby, "id"> = {
  name: "",
  description: "",
};

export const DEFAULT_LANGUAGE: Omit<Language, "id"> = {
  name: "",
  proficiency: "Intermediate",
};

export const DEFAULT_PROJECT: Omit<Project, "id"> = {
  title: "",
  summary: "",
  highlights: [],
  tools: "",
  projectLink: "",
};

export const DEFAULT_SKILLS: Skills = {
  languages: [],
  technologies: [],
  softSkills: [],
};

// ── Aggregate section defaults map ──

export const SECTION_DEFAULTS: Record<SectionTypeValue, object> = {
  education: DEFAULT_EDUCATION,
  project: DEFAULT_PROJECT,
  work_experience: DEFAULT_EXPERIENCE,
  skills: DEFAULT_SKILLS,
  certification: DEFAULT_CERTIFICATION,
  extracurricular: DEFAULT_EXTRACURRICULAR,
  hobbies: DEFAULT_HOBBY,
  languages: DEFAULT_LANGUAGE,
};

// ── Default resume shape ──

export const DEFAULT_RESUME: Resume = {
  name: "My Resume",
  description: "New Resume",
  template: "default",
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
