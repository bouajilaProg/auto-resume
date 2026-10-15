"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { SectionTypeValue, SectionType, ResumeConfig, DEFAULT_CONFIG } from "@/types/resumeTypes";
import useResumeSectionData from "./useResumeSectionData";
import { assembleResume, normalizeConfig } from "@/utils/assembleResume";

const CONFIGS_BY_RESUME_KEY = "resumeConfigsById";
const ACTIVE_CONFIG_BY_RESUME_KEY = "activeConfigByResumeId";
const LEGACY_CONFIGS_KEY = "resumeConfigsKey";

type ConfigsByResume = Record<string, ResumeConfig[]>;
type ActiveConfigByResume = Record<string, string>;


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
    importResumeData,
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

    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronize stored versions with the active resume
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

    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronize stored versions with the active resume
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

  const assembledResume = useMemo(() =>
    resumeSectionData ? assembleResume(resumeSectionData, activeConfig) : null,
    [resumeSectionData, activeConfig]
  );

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

  const duplicateConfig = useCallback(() => {
    const duplicated: ResumeConfig = {
      ...activeConfig,
      id: crypto.randomUUID(),
      name: `${activeConfig.name}-copy`,
      lastUpdate: new Date().toLocaleDateString(),
    };
    setConfigs(prev => [...prev, duplicated]);
    setActiveConfigId(duplicated.id);
    setIsDirty(true);
  }, [activeConfig, setConfigs, setActiveConfigId]);

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

  return {
    masterData: resumeSectionData,
    importResumeData,
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
    duplicateConfig,
    deleteConfig,
    renameConfig,
    loading: globalLoading || !resumeSectionData || !activeResumeId || configs.length === 0,
  };
}
