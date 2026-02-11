export const PROFICIENCY_LEVELS = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Beginner",
] as const;

export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number];

export interface Language {
  id: number;
  name: string;
  proficiency?: ProficiencyLevel;
}

export type Languages = Language[];
