// This proxy re-exports schemas and constants from the package's
// types-only subpath using a relative path.  This bypasses the
// package.json "exports" restriction and avoids pulling in the
// compile/execa runtime code that lives in dist/src/index.js.
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
} from "../../node_modules/bouajila-resume-generator/dist/types/index.js";
