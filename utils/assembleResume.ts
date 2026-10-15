import { SectionType, DEFAULT_CONFIG, PROFICIENCY_LEVELS } from "@/types/resumeTypes";
import type { Resume, ResumeSection, ResumeConfig, Skills } from "@/types/resumeTypes";

export const normalizeConfig = (config: ResumeConfig) => {
  const updatedOrder = Array.isArray(config.sectionOrder) ? [...config.sectionOrder] : [];
  DEFAULT_CONFIG.sectionOrder.forEach(type => {
    if (!updatedOrder.includes(type)) {
      updatedOrder.push(type);
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


export function assembleResume(resumeSectionData: Resume, activeConfig: ResumeConfig): Resume {
    const filteredSections = activeConfig.sectionOrder.map(type => {
      const section = (resumeSectionData.sections || []).find(s => s.type === type);
      if (!section) return null;

      // handle Skills section with subcategories
      if (type === SectionType.Skills && !Array.isArray(section.body)) {
        const body = section.body as Skills;
        const selected = activeConfig.selectedItems.skills || { languages: [], technologies: [], softSkills: [] };
        const order = activeConfig.itemOrder?.skills || { languages: [], technologies: [], softSkills: [] };

        const sortItems = <T extends { id: number }>(items: T[], itemOrder: number[]) => {
          return [...items].sort((a, b) => {
            const indexA = itemOrder.indexOf(a.id);
            const indexB = itemOrder.indexOf(b.id);
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });
        };

        return {
          ...section,
          body: {
            languages: sortItems(body.languages?.filter(i => selected.languages?.includes(i.id)) || [], order.languages),
            technologies: sortItems(body.technologies?.filter(i => selected.technologies?.includes(i.id)) || [], order.technologies),
            softSkills: sortItems(body.softSkills?.filter(i => selected.softSkills?.includes(i.id)) || [], order.softSkills),
          }
        };
      }

      // handle array-based sections
      if (Array.isArray(section.body)) {
        const key = type as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
        const selectedIds = (activeConfig.selectedItems[key] as number[]) || [];
        const itemOrder = (activeConfig.itemOrder?.[key] as number[]) || [];

        // early return if no items selected
        if (selectedIds.length === 0) {
          return { ...section, body: [] };
        }

        const selectedSet = new Set(selectedIds);
        const filtered = section.body.filter((item: { id: number }) => selectedSet.has(item.id));

        // sort based on itemOrder
        const sorted = [...filtered].sort((a, b) => {
          const indexA = itemOrder.indexOf(a.id);
          const indexB = itemOrder.indexOf(b.id);
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });

        return {
          ...section,
          body: sorted,
        };
      }

      return section;
    }).filter((s): s is Exclude<typeof s, null> => s !== null);

    const sortItems = <T extends { id: number }>(items: T[], itemOrder: number[]) => {
      return [...items].sort((a, b) => {
        const indexA = itemOrder.indexOf(a.id);
        const indexB = itemOrder.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    };

    const assembledPersonalInfo = resumeSectionData.personalInfo ? {
      ...resumeSectionData.personalInfo,
      contact: sortItems(
        (resumeSectionData.personalInfo.contact || []).filter(c => activeConfig.selectedItems.personalInfo.includes(c.id)),
        activeConfig.itemOrder?.personalInfo || []
      )
    } : undefined;

    // Sanitize language proficiency values before sending to the API.
    // The generator requires proficiency to be one of the PROFICIENCY_LEVELS enum values.
    const sanitizedSections = filteredSections.map(section => {
      if (section.type === SectionType.Languages && Array.isArray(section.body)) {
        return {
          ...section,
          body: (section.body as Array<{ id: number; name: string; proficiency?: string }>).map(lang => ({
            ...lang,
            proficiency: lang.proficiency && (PROFICIENCY_LEVELS as readonly string[]).includes(lang.proficiency)
              ? lang.proficiency
              : "Intermediate",
          })),
        };
      }
      return section;
    });

    return {
      name: resumeSectionData.name,
      description: resumeSectionData.description,
      lastUpdate: resumeSectionData.lastUpdate,
      personalInfo: assembledPersonalInfo,
      sections: sanitizedSections as ResumeSection[],
    };
}
