import { SectionType, DEFAULT_CONFIG, PROFICIENCY_LEVELS } from "@/types/resumeTypes";
import type { Resume, ResumeSection, ResumeConfig, Skills } from "@/types/resumeTypes";

export const normalizeConfig = (config: ResumeConfig) => {
  const updatedOrder = Array.isArray(config.sectionOrder) ? [...config.sectionOrder] : [];
  const ordered = new Set(updatedOrder);
  DEFAULT_CONFIG.sectionOrder.forEach(type => {
    if (!ordered.has(type)) {
      updatedOrder.push(type);
      ordered.add(type);
    }
  });

  const updatedSelectedItems = {
    ...DEFAULT_CONFIG.selectedItems,
    ...config.selectedItems,
    skills: {
      ...DEFAULT_CONFIG.selectedItems.skills,
      ...(config.selectedItems?.skills || {})
    },
    personalInfo: config.selectedItems?.personalInfo || []
  };

  const updatedItemOrder = {
    ...(DEFAULT_CONFIG.itemOrder || {
      personalInfo: [],
      education: [],
      work_experience: [],
      project: [],
      certification: [],
      extracurricular: [],
      hobbies: [],
      languages: [],
      skills: { languages: [], technologies: [], softSkills: [] }
    }),
    ...(config.itemOrder || {}),
    skills: {
      ...(DEFAULT_CONFIG.itemOrder?.skills || { languages: [], technologies: [], softSkills: [] }),
      ...(config.itemOrder?.skills || {})
    },
    personalInfo: config.itemOrder?.personalInfo || []
  };

  return {
    ...config,
    sectionOrder: updatedOrder,
    selectedItems: updatedSelectedItems,
    itemOrder: updatedItemOrder
  };
};


function selectAndSort<T extends { id: number }>(items: T[] | undefined, selectedIds: number[], order: number[]) {
  const selected = new Set(selectedIds);
  const positions = new Map(order.map((id, index) => [id, index]));
  return (items || []).filter(item => selected.has(item.id)).sort((a, b) =>
    (positions.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (positions.get(b.id) ?? Number.MAX_SAFE_INTEGER)
  );
}

export function assembleResume(data: Resume, config: ResumeConfig): Resume {
  const sectionsByType = new Map((data.sections || []).map(section => [section.type, section]));
  const sections = config.sectionOrder.flatMap(type => {
    const section = sectionsByType.get(type);
    if (!section) return [];
    if (type === SectionType.Skills && !Array.isArray(section.body)) {
      const body = section.body as Skills;
      const selected = config.selectedItems.skills;
      const order = config.itemOrder?.skills;
      return [{ ...section, body: {
        languages: selectAndSort(body.languages, selected.languages, order?.languages || []),
        technologies: selectAndSort(body.technologies, selected.technologies, order?.technologies || []),
        softSkills: selectAndSort(body.softSkills, selected.softSkills, order?.softSkills || []),
      } } as ResumeSection];
    }
    if (!Array.isArray(section.body)) return [section];
    const key = type as keyof Omit<ResumeConfig["selectedItems"], "skills">;
    const body = selectAndSort<{ id: number }>(section.body, config.selectedItems[key] || [], config.itemOrder?.[key] || []);
    if (type === SectionType.Languages) {
      return [{ ...section, body: (body as Array<{ id: number; name: string; proficiency?: string }>).map(language => ({
        ...language,
        proficiency: language.proficiency && (PROFICIENCY_LEVELS as readonly string[]).includes(language.proficiency)
          ? language.proficiency : "Intermediate",
      })) } as ResumeSection];
    }
    return [{ ...section, body } as ResumeSection];
  });
  return {
    name: data.name,
    description: data.description,
    lastUpdate: data.lastUpdate,
    personalInfo: data.personalInfo ? {
      ...data.personalInfo,
      contact: selectAndSort(data.personalInfo.contact, config.selectedItems.personalInfo, config.itemOrder?.personalInfo || []),
    } : undefined,
    sections,
  };
}
