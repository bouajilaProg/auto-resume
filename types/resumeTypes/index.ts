// Re-export only types from the main package entry.
// `export type *` is erased at compile time and never pulls runtime code.
export type * from "bouajila-resume-generator";

// Re-export Zod schemas and constants (runtime values) from a local
// proxy that imports from the package's types-only subpath.
// This avoids pulling in compile/execa code into client bundles.
// Turbopack resolves "bouajila-resume-generator/types" to this proxy
// via the resolveAlias in next.config.ts; TypeScript resolves it
// via the paths entry in tsconfig.json.
export {
  // Section schemas
  CertificationSchema,
  DegreeTypeSchema,
  EducationItemSchema,
  WorkExperienceSchema,
  ExtraCurricularActivitySchema,
  HobbySchema,
  HobbiesSchema,
  ProficiencyLevelSchema,
  LanguageSchema,
  LanguagesSchema,
  ContactTypeSchema,
  ContactSchema,
  PersonalInfoSchema,
  ProjectSchema,
  SkillTypeSchema,
  SkillItemSchema,
  SkillsSchema,
  ResumeSectionSchema,
  ResumeSchema,
  // Constants
  SectionType,
  CONTACT_TYPES,
  PROFICIENCY_LEVELS,
  SKILL_TYPES,
} from "bouajila-resume-generator/types";

// Local-only exports
export * from "./personalInfo";
export * from "./config";
export * from "./defaults";
