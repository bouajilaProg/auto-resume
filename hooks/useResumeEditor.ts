"use client";

import { useState, useCallback, useMemo } from "react";
import { ResumeSection, SectionTypeValue, SectionType, ResumeConfig, DEFAULT_CONFIG, Skills } from "@/types/resumeTypes";
import useResumeSectionData from "./useResumeSectionData";

const CONFIGS_KEY = "resumeConfigsKey";

// helper function to initialize state from localStorage
function initializeState() {
  // check if we're in the browser (not SSR)
  if (typeof window === 'undefined') {
    return { configs: [DEFAULT_CONFIG], activeConfigId: DEFAULT_CONFIG.id };
  }

  const raw = localStorage.getItem(CONFIGS_KEY);
  let loadedConfigs: ResumeConfig[] = [DEFAULT_CONFIG];

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const configsToMigrate = Array.isArray(parsed) ? parsed : [parsed];

      // migration: Ensure all default sections are present in each config's sectionOrder and selectedItems
      loadedConfigs = configsToMigrate.map((config: ResumeConfig) => {
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
      });
    } catch (e) {
      loadedConfigs = [DEFAULT_CONFIG];
    }
  }

  let initialActiveId = loadedConfigs[0]?.id || "default";
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (idParam && loadedConfigs.find(c => c.id === idParam)) {
    initialActiveId = idParam;
  }

  return { configs: loadedConfigs, activeConfigId: initialActiveId };
}

export default function useResumeEditor() {
  const { resumeSectionData, loading: globalLoading } = useResumeSectionData();

  // initialize both configs and activeConfigId together to avoid calling initializeState twice
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return { configs: [DEFAULT_CONFIG], activeConfigId: DEFAULT_CONFIG.id };
    }
    return initializeState();
  });

  const [isDirty, setIsDirty] = useState(false);

  const configs = state.configs;
  const activeConfigId = state.activeConfigId;

  const setConfigs = useCallback((updater: ResumeConfig[] | ((prev: ResumeConfig[]) => ResumeConfig[])) => {
    setState(prev => ({
      ...prev,
      configs: typeof updater === 'function' ? updater(prev.configs) : updater
    }));
  }, []);

  const setActiveConfigId = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeConfigId: id }));
  }, []);

  const activeConfig = useMemo(() =>
    configs.find(c => c.id === activeConfigId) || configs[0] || DEFAULT_CONFIG,
    [configs, activeConfigId]
  );

  const assembledResume = useMemo(() => {
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
    });
  }, [activeConfigId]);

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
    });
  }, [activeConfigId]);

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
    });
  }, [activeConfigId]);

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
    });
  }, [activeConfigId]);

  const save = useCallback(() => {
    const updatedConfigs = configs.map(c =>
      c.id === activeConfigId
        ? { ...c, lastUpdate: new Date().toLocaleDateString() }
        : c
    );
    localStorage.setItem(CONFIGS_KEY, JSON.stringify(updatedConfigs));
    setConfigs(updatedConfigs);
    setIsDirty(false);
  }, [configs, activeConfigId]);

  const cancel = useCallback(() => {
    const raw = localStorage.getItem(CONFIGS_KEY);
    if (raw) {
      setConfigs(JSON.parse(raw));
    }
    setIsDirty(false);
  }, []);

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
  }, []);

  const deleteConfig = useCallback((id: string) => {
    setConfigs(prev => {
      if (prev.length <= 1) return prev; // don't delete last config
      const filtered = prev.filter(c => c.id !== id);
      if (activeConfigId === id) {
        setActiveConfigId(filtered[0].id);
      }
      return filtered;
    });
    setIsDirty(true);
  }, [activeConfigId]);

  const renameConfig = useCallback((id: string, name: string) => {
    setConfigs(prev => {
      const configIndex = prev.findIndex(c => c.id === id);
      if (configIndex === -1) return prev;

      const newConfigs = [...prev];
      newConfigs[configIndex] = { ...prev[configIndex], name };
      return newConfigs;
    });
    setIsDirty(true);
  }, []);

  return {
    masterData: resumeSectionData,
    activeConfig,
    configs,
    assembledResume,
    isDirty,
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
    loading: globalLoading || !resumeSectionData || configs.length === 0,
  };
}
