// skills info
const SKILL_TYPES = {
  LANG: "languages",
  TECH: "technologies",
  SOFT: "softSkills",
} as const;

type SkillType = keyof typeof SKILL_TYPES;

interface SkillItem {
  id: number;
  type: SkillType;
  name: string;
}

interface Skills {
  languages: SkillItem[];
  technologies: SkillItem[];
  softSkills: SkillItem[];
}

export type { Skills, SkillItem, SkillType };
export { SKILL_TYPES };

