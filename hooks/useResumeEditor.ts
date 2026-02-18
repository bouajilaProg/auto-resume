"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { ResumeSection, SectionTypeValue, SectionType, ResumeConfig, DEFAULT_CONFIG, Skills } from "@/types/resumeTypes";
import useResumeSectionData from "./useResumeSectionData";

const CONFIGS_BY_RESUME_KEY = "resumeConfigsById";
const ACTIVE_CONFIG_BY_RESUME_KEY = "activeConfigByResumeId";
const LEGACY_CONFIGS_KEY = "resumeConfigsKey";

type ConfigsByResume = Record<string, ResumeConfig[]>;
type ActiveConfigByResume = Record<string, string>;

const normalizeConfig = (config: ResumeConfig) => {
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

const normalizeConfigs = (configs: ResumeConfig[]) => {
  return configs.map(normalizeConfig);
};

export default function useResumeEditor() {
  const {
    resumeSectionData,
    loading: globalLoading,
    resumes,
    activeResumeId,
    createResume,
    duplicateResume: baseDuplicateResume,
  } = useResumeSectionData();

  const [configsByResume, setConfigsByResume] = useState<ConfigsByResume>(() => {
    if (typeof window === "undefined") {
      return {};
    }
    const raw = localStorage.getItem(CONFIGS_BY_RESUME_KEY);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const normalized: ConfigsByResume = {};
        Object.entries(parsed as ConfigsByResume).forEach(([resumeId, configs]) => {
          normalized[resumeId] = normalizeConfigs(configs);
        });
        return normalized;
      }
      return {};
    } catch {
      return {};
    }
  });

  const [activeConfigByResume, setActiveConfigByResume] = useState<ActiveConfigByResume>(() => {
    if (typeof window === "undefined") {
      return {};
    }
    const raw = localStorage.getItem(ACTIVE_CONFIG_BY_RESUME_KEY);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as ActiveConfigByResume : {};
    } catch {
      return {};
    }
  });

  const [isDirty, setIsDirty] = useState(false);

  const persistConfigs = useCallback((nextConfigs: ConfigsByResume, nextActiveConfig: ActiveConfigByResume) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CONFIGS_BY_RESUME_KEY, JSON.stringify(nextConfigs));
    localStorage.setItem(ACTIVE_CONFIG_BY_RESUME_KEY, JSON.stringify(nextActiveConfig));
  }, []);

  const duplicateResume = useCallback((sourceId: string, name?: string) => {
    const newId = baseDuplicateResume(sourceId, name);
    if (!newId) return null;

    setConfigsByResume(prev => {
      const sourceConfigs = prev[sourceId] || [normalizeConfig(DEFAULT_CONFIG)];
      const nextConfigs = { ...prev, [newId]: JSON.parse(JSON.stringify(sourceConfigs)) };
      
      setActiveConfigByResume(prevActive => {
        const sourceActiveId = prevActive[sourceId];
        const nextActive = { ...prevActive, [newId]: sourceActiveId };
        persistConfigs(nextConfigs, nextActive);
        return nextActive;
      });
      
      return nextConfigs;
    });

    return newId;
  }, [baseDuplicateResume, persistConfigs]);

  // Initialize configs for the active resume (only when activeResumeId changes)
  useEffect(() => {
    if (!activeResumeId) return;

    setConfigsByResume(prevConfigs => {
      let nextConfigsByResume = prevConfigs;
      let didUpdate = false;

      if (!nextConfigsByResume[activeResumeId]) {
        let configsToSeed: ResumeConfig[] | null = null;
        const legacyRaw = typeof window !== "undefined" ? localStorage.getItem(LEGACY_CONFIGS_KEY) : null;
        if (legacyRaw) {
          try {
            const parsed = JSON.parse(legacyRaw);
            const configs = Array.isArray(parsed) ? parsed : [parsed];
            configsToSeed = normalizeConfigs(configs as ResumeConfig[]);
          } catch {
            configsToSeed = null;
          }
          if (typeof window !== "undefined") {
            localStorage.removeItem(LEGACY_CONFIGS_KEY);
          }
        }

        if (!configsToSeed || configsToSeed.length === 0) {
          configsToSeed = [normalizeConfig(DEFAULT_CONFIG)];
        }

        nextConfigsByResume = {
          ...nextConfigsByResume,
          [activeResumeId]: configsToSeed,
        };
        didUpdate = true;
      }

      if (didUpdate) {
        // Persist the seeded configs immediately (structural change, not user edit)
        setActiveConfigByResume(prevActive => {
          const currentConfigs = nextConfigsByResume[activeResumeId] || [normalizeConfig(DEFAULT_CONFIG)];
          const currentActiveId = prevActive[activeResumeId];
          const validActiveId = currentConfigs.find(c => c.id === currentActiveId)?.id || currentConfigs[0]?.id || DEFAULT_CONFIG.id;
          const nextActive = currentActiveId !== validActiveId
            ? { ...prevActive, [activeResumeId]: validActiveId }
            : prevActive;
          persistConfigs(nextConfigsByResume, nextActive);
          return nextActive;
        });
        return nextConfigsByResume;
      }

      // Even if we didn't seed, ensure activeConfigByResume has a valid entry
      setActiveConfigByResume(prevActive => {
        const currentConfigs = nextConfigsByResume[activeResumeId] || [normalizeConfig(DEFAULT_CONFIG)];
        const currentActiveId = prevActive[activeResumeId];
        const validActiveId = currentConfigs.find(c => c.id === currentActiveId)?.id || currentConfigs[0]?.id || DEFAULT_CONFIG.id;
        if (currentActiveId !== validActiveId) {
          const nextActive = { ...prevActive, [activeResumeId]: validActiveId };
          persistConfigs(nextConfigsByResume, nextActive);
          return nextActive;
        }
        return prevActive;
      });

      return prevConfigs;
    });

    setIsDirty(false);
  }, [activeResumeId, persistConfigs]);

  // Clean up stale config entries for deleted resumes
  useEffect(() => {
    if (resumes.length === 0) return;
    const validIds = new Set(resumes.map(resume => resume.id));

    setConfigsByResume(prevConfigs => {
      const staleConfigIds = Object.keys(prevConfigs).filter(id => !validIds.has(id));
      if (staleConfigIds.length === 0) return prevConfigs;

      const nextConfigs = { ...prevConfigs };
      staleConfigIds.forEach(id => {
        delete nextConfigs[id];
      });

      setActiveConfigByResume(prevActive => {
        const staleActiveIds = Object.keys(prevActive).filter(id => !validIds.has(id));
        if (staleActiveIds.length === 0) {
          persistConfigs(nextConfigs, prevActive);
          return prevActive;
        }
        const nextActive = { ...prevActive };
        staleActiveIds.forEach(id => {
          delete nextActive[id];
        });
        persistConfigs(nextConfigs, nextActive);
        return nextActive;
      });

      return nextConfigs;
    });
  }, [resumes, persistConfigs]);

  const configs = useMemo(() => {
    if (!activeResumeId) return [DEFAULT_CONFIG];
    return configsByResume[activeResumeId] || [DEFAULT_CONFIG];
  }, [activeResumeId, configsByResume]);

  const activeConfigId = useMemo(() => {
    if (!activeResumeId) return DEFAULT_CONFIG.id;
    return activeConfigByResume[activeResumeId] || configs[0]?.id || DEFAULT_CONFIG.id;
  }, [activeResumeId, activeConfigByResume, configs]);

  // Fix #12: skip normalization on in-place mutations (toggleItem, moveSection, etc.)
  const setConfigs = useCallback((updater: ResumeConfig[] | ((prev: ResumeConfig[]) => ResumeConfig[]), skipNormalize = false) => {
    if (!activeResumeId) return;
    setConfigsByResume(prev => {
      const current = prev[activeResumeId] || [DEFAULT_CONFIG];
      const nextConfigs = typeof updater === "function" ? updater(current) : updater;
      const result = skipNormalize ? nextConfigs : normalizeConfigs(nextConfigs);
      return { ...prev, [activeResumeId]: result };
    });
  }, [activeResumeId]);

  const setActiveConfigId = useCallback((id: string) => {
    if (!activeResumeId) return;
    setActiveConfigByResume(prev => {
      return { ...prev, [activeResumeId]: id };
    });
  }, [activeResumeId]);

  const activeConfig = useMemo(() =>
    configs.find(c => c.id === activeConfigId) || configs[0] || DEFAULT_CONFIG,
    [configs, activeConfigId]
  );

  // Fix #2: Deep-equality check to avoid returning new object references
  const prevAssembledRef = useRef<string | null>(null);
  const prevAssembledObjRef = useRef<ReturnType<typeof computeAssembledResume> | null>(null);

  const computeAssembledResume = useCallback(() => {
    if (!resumeSectionData || !activeConfig) return null;

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

    return {
      name: resumeSectionData.name,
      description: resumeSectionData.description,
      lastUpdate: resumeSectionData.lastUpdate,
      personalInfo: assembledPersonalInfo,
      sections: filteredSections as ResumeSection[],
    };
  }, [resumeSectionData, activeConfig]);

  const assembledResume = useMemo(() => {
    const result = computeAssembledResume();
    const serialized = JSON.stringify(result);
    // eslint-disable-next-line react-hooks/refs -- intentional deep-equality memoization pattern
    if (serialized === prevAssembledRef.current) {
      // eslint-disable-next-line react-hooks/refs
      return prevAssembledObjRef.current;
    }
    // eslint-disable-next-line react-hooks/refs
    prevAssembledRef.current = serialized;
    // eslint-disable-next-line react-hooks/refs
    prevAssembledObjRef.current = result;
    return result;
  }, [computeAssembledResume]);

  // optimized toggleItem - only updates the specific config that changed
  const toggleItem = useCallback((sectionType: SectionTypeValue | "personalInfo", itemId: number, subType?: string) => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === activeConfigId);
      if (configIndex === -1) return prev;

      const config = prev[configIndex];
      const newSelectedItems = {
        ...config.selectedItems,
        skills: { ...config.selectedItems.skills }
      };

      const defaultItemOrder = {
        personalInfo: [],
        education: [],
        work_experience: [],
        project: [],
        certification: [],
        extracurricular: [],
        hobbies: [],
        languages: [],
        skills: { languages: [], technologies: [], softSkills: [] }
      };

      const newItemOrder = {
        ...defaultItemOrder,
        ...(config.itemOrder || {}),
        skills: {
          ...defaultItemOrder.skills,
          ...(config.itemOrder?.skills || {})
        }
      };
      
      // Ensure personalInfo is initialized
      if (!newItemOrder.personalInfo) newItemOrder.personalInfo = [];

      if (sectionType === SectionType.Skills && subType) {
        const key = subType as keyof ResumeConfig['selectedItems']['skills'];
        const currentSelected = newSelectedItems.skills[key] || [];
        const isSelected = currentSelected.includes(itemId);

        newSelectedItems.skills[key] = isSelected
          ? currentSelected.filter(id => id !== itemId)
          : [...currentSelected, itemId];

        const currentOrder = newItemOrder.skills[key] || [];
        newItemOrder.skills[key] = isSelected
          ? currentOrder.filter(id => id !== itemId)
          : [...currentOrder, itemId];
      } else {
        const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
        const currentSelected = (newSelectedItems[key] as number[]) || [];
        const isSelected = currentSelected.includes(itemId);

        const updatedSelected = isSelected
          ? currentSelected.filter((id: number) => id !== itemId)
          : [...currentSelected, itemId];
        newSelectedItems[key] = updatedSelected as typeof newSelectedItems[typeof key];

        const currentOrder = (newItemOrder[key] as number[]) || [];
        const updatedOrder = isSelected
          ? currentOrder.filter((id: number) => id !== itemId)
          : [...currentOrder, itemId];
        newItemOrder[key] = updatedOrder as typeof newItemOrder[typeof key];
      }

      // only create new array with changed config
      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...config, selectedItems: newSelectedItems, itemOrder: newItemOrder };

      setIsDirty(true);
      return newConfigs;
    }, true);
  }, [activeConfigId, setConfigs]);

  const toggleAll = useCallback((sectionType: SectionTypeValue | "personalInfo", itemIds: number[], subType?: string, forceState?: boolean) => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === activeConfigId);
      if (configIndex === -1) return prev;

      const config = prev[configIndex];
      const newSelectedItems = {
        ...config.selectedItems,
        skills: { ...config.selectedItems.skills }
      };

      const defaultItemOrder = {
        personalInfo: [],
        education: [],
        work_experience: [],
        project: [],
        certification: [],
        extracurricular: [],
        hobbies: [],
        languages: [],
        skills: { languages: [], technologies: [], softSkills: [] }
      };

      const newItemOrder = {
        ...defaultItemOrder,
        ...(config.itemOrder || {}),
        skills: {
          ...defaultItemOrder.skills,
          ...(config.itemOrder?.skills || {})
        }
      };

      // Ensure personalInfo is initialized
      if (!newItemOrder.personalInfo) newItemOrder.personalInfo = [];

      if (sectionType === SectionType.Skills && subType) {
        const key = subType as keyof ResumeConfig['selectedItems']['skills'];
        const currentSelected = newSelectedItems.skills[key] || [];
        const allSelected = itemIds.every(id => currentSelected.includes(id));
        const targetState = forceState !== undefined ? forceState : !allSelected;

        newSelectedItems.skills[key] = targetState
          ? Array.from(new Set([...currentSelected, ...itemIds]))
          : currentSelected.filter(id => !itemIds.includes(id));

        const currentOrder = newItemOrder.skills[key] || [];
        newItemOrder.skills[key] = targetState
          ? Array.from(new Set([...currentOrder, ...itemIds]))
          : currentOrder.filter(id => !itemIds.includes(id));
      } else {
        const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
        const currentSelected = (newSelectedItems[key] as number[]) || [];
        const allSelected = itemIds.every(id => currentSelected.includes(id));
        const targetState = forceState !== undefined ? forceState : !allSelected;

        const updatedSelected = targetState
          ? Array.from(new Set([...currentSelected, ...itemIds]))
          : currentSelected.filter((id: number) => !itemIds.includes(id));
        newSelectedItems[key] = updatedSelected as typeof newSelectedItems[typeof key];

        const currentOrder = (newItemOrder[key] as number[]) || [];
        const updatedOrder = targetState
          ? Array.from(new Set([...currentOrder, ...itemIds]))
          : currentOrder.filter((id: number) => !itemIds.includes(id));
        newItemOrder[key] = updatedOrder as typeof newItemOrder[typeof key];
      }

      // only create new array with changed config
      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...config, selectedItems: newSelectedItems, itemOrder: newItemOrder };

      setIsDirty(true);
      return newConfigs;
    }, true);
  }, [activeConfigId, setConfigs]);

  const moveSection = useCallback((index: number, direction: "up" | "down") => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === activeConfigId);
      if (configIndex === -1) return prev;

      const config = prev[configIndex];
      const newOrder = [...config.sectionOrder];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newOrder.length) return prev;

      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

      // only create new array with changed config
      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...config, sectionOrder: newOrder };

      setIsDirty(true);
      return newConfigs;
    }, true);
  }, [activeConfigId, setConfigs]);

  const moveItem = useCallback((sectionType: SectionTypeValue | "personalInfo", itemId: number, direction: "up" | "down" | "left" | "right", subType?: string) => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === activeConfigId);
      if (configIndex === -1) return prev;

      const config = prev[configIndex];
      const newItemOrder = JSON.parse(JSON.stringify(config.itemOrder || DEFAULT_CONFIG.itemOrder));

      // Ensure personalInfo is initialized
      if (!newItemOrder.personalInfo) newItemOrder.personalInfo = [];

      if (sectionType === SectionType.Skills && subType) {
        const key = subType as keyof Required<ResumeConfig>['itemOrder']['skills'];
        const currentOrder = [...(newItemOrder.skills[key] || [])];
        const index = currentOrder.indexOf(itemId);
        if (index === -1) return prev;

        const targetIndex = (direction === "up" || direction === "left") ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= currentOrder.length) return prev;

        [currentOrder[index], currentOrder[targetIndex]] = [currentOrder[targetIndex], currentOrder[index]];
        newItemOrder.skills[key] = currentOrder;
      } else {
        const key = sectionType as keyof Omit<Required<ResumeConfig>['itemOrder'], 'skills'>;
        const currentOrder = [...((newItemOrder[key] as number[]) || [])];
        const index = currentOrder.indexOf(itemId);
        if (index === -1) return prev;

        const targetIndex = (direction === "up" || direction === "left") ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= currentOrder.length) return prev;

        [currentOrder[index], currentOrder[targetIndex]] = [currentOrder[targetIndex], currentOrder[index]];
        newItemOrder[key] = currentOrder as number[];
      }

      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...config, itemOrder: newItemOrder };
      setIsDirty(true);
      return newConfigs;
    }, true);
  }, [activeConfigId, setConfigs]);

  const save = useCallback(() => {
    if (!activeResumeId) return;
    setConfigsByResume(prev => {
      const current = prev[activeResumeId] || [DEFAULT_CONFIG];
      const updatedConfigs = current.map(c =>
        c.id === activeConfigId
          ? { ...c, lastUpdate: new Date().toLocaleDateString() }
          : c
      );
      const next = { ...prev, [activeResumeId]: updatedConfigs };
      setActiveConfigByResume(prevActive => {
        persistConfigs(next, prevActive);
        return prevActive;
      });
      return next;
    });
    setIsDirty(false);
  }, [activeResumeId, activeConfigId, persistConfigs]);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !activeResumeId) {
      setIsDirty(false);
      return;
    }
    // Reload configs from localStorage, discarding in-memory changes
    const rawConfigs = localStorage.getItem(CONFIGS_BY_RESUME_KEY);
    if (rawConfigs) {
      try {
        const parsed = JSON.parse(rawConfigs) as ConfigsByResume;
        const normalized: ConfigsByResume = {};
        Object.entries(parsed).forEach(([resumeId, configs]) => {
          normalized[resumeId] = normalizeConfigs(configs);
        });
        setConfigsByResume(normalized);
      } catch {
        // If parsing fails, keep current state
      }
    }
    const rawActive = localStorage.getItem(ACTIVE_CONFIG_BY_RESUME_KEY);
    if (rawActive) {
      try {
        const parsed = JSON.parse(rawActive) as ActiveConfigByResume;
        setActiveConfigByResume(parsed);
      } catch {
        // If parsing fails, keep current state
      }
    }
    setIsDirty(false);
  }, [activeResumeId]);

  const createNewConfig = useCallback((name: string) => {
    const newConfig: ResumeConfig = {
      ...DEFAULT_CONFIG,
      id: crypto.randomUUID(),
      name,
      description: `New version created on ${new Date().toLocaleDateString()}`,
      lastUpdate: new Date().toLocaleDateString(),
    };
    setConfigs(prev => [...prev, newConfig]);
    setActiveConfigId(newConfig.id);
    setIsDirty(true);
  }, [setActiveConfigId, setConfigs]);

  const deleteConfig = useCallback((id: string) => {
    if (!activeResumeId) return;
    setConfigsByResume(prevConfigs => {
      const current = prevConfigs[activeResumeId] || [DEFAULT_CONFIG];
      if (current.length <= 1) return prevConfigs;

      const filtered = normalizeConfigs(current.filter(c => c.id !== id));
      const nextConfigs = { ...prevConfigs, [activeResumeId]: filtered };

      setActiveConfigByResume(prevActive => {
        let nextActiveId = prevActive[activeResumeId];
        let switched = false;
        if (nextActiveId === id) {
          nextActiveId = filtered[0].id;
          switched = true;
        }
        const nextActive = { ...prevActive, [activeResumeId]: nextActiveId };
        persistConfigs(nextConfigs, nextActive);
        if (switched) setIsDirty(false);
        return nextActive;
      });

      return nextConfigs;
    });
  }, [activeResumeId, persistConfigs]);

  const renameConfig = useCallback((id: string, name: string) => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === id);
      if (configIndex === -1) return prev;

      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...prev[configIndex], name };
      return newConfigs;
    });
    setIsDirty(true);
  }, [setConfigs]);

  // eslint-disable-next-line react-hooks/refs -- assembledResume uses ref-based deep equality in useMemo (intentional)
  return {
    masterData: resumeSectionData,
    activeConfig,
    configs,
    assembledResume,
    isDirty,
    resumes,
    activeResumeId,
    createResume,
    duplicateResume,
    toggleItem,
    toggleAll,
    moveSection,
    moveItem,
    save,
    cancel,
    setActiveConfigId,
    createNewConfig,
    deleteConfig,
    renameConfig,
    loading: globalLoading || !resumeSectionData || !activeResumeId || configs.length === 0,
  };
}
