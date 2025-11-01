// skills info
enum skillType {
  languages,
  technologies,
  softSkills
}

interface SkillItem {
  id: number;
  type: skillType;
  name: string;
}

interface Skills {
  languages: SkillItem[];
  technologies: SkillItem[];
  softSkills: SkillItem[];
}

export type { Skills, SkillItem };
export { skillType };

