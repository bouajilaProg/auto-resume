"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Resume, SectionTypeValue, SectionType, ResumeConfig, DEFAULT_CONFIG, Skills, ResumeSection } from "@/types/resumeTypes";
import useResumeSectionData from "./useResumeSectionData";

const CONFIGS_KEY = "resumeConfigsKey";

export default function useResumeEditor() {
  const { resumeSectionData, loading: globalLoading } = useResumeSectionData();
  const [configs, setConfigs] = useState<ResumeConfig[]>([]);
  const [activeConfigId, setActiveConfigId] = useState<string>("default");
  const [isDirty, setIsDirty] = useState(false);

  // Load configs from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(CONFIGS_KEY);
    let loadedConfigs: ResumeConfig[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const configsToMigrate = Array.isArray(parsed) ? parsed : [parsed];

        // Migration: Ensure all default sections are present in each config's sectionOrder and selectedItems
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
            }
          };

          return { ...config, sectionOrder: updatedOrder, selectedItems: updatedSelectedItems };
        });
      } catch (e) {
        loadedConfigs = [DEFAULT_CONFIG];
      }
    } else {
      loadedConfigs = [DEFAULT_CONFIG];
    }
    
    // Use a small timeout to avoid synchronous setState warning in some environments
    // or just accept the cascading render as it's the initial load.
    setConfigs(loadedConfigs);

    // Handle initial active ID from URL or default
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam && loadedConfigs.find(c => c.id === idParam)) {
      setActiveConfigId(idParam);
    } else {
      setActiveConfigId(loadedConfigs[0]?.id || "default");
    }
  }, []);

  const activeConfig = useMemo(() => 
    configs.find(c => c.id === activeConfigId) || configs[0] || DEFAULT_CONFIG,
  [configs, activeConfigId]);

  const assembledResume = useMemo(() => {
    if (!resumeSectionData || !activeConfig) return null;

    const filteredSections = activeConfig.sectionOrder.map(type => {
      const section = resumeSectionData.sections.find(s => s.type === type);
      if (!section) return null;

      if (type === SectionType.Skills && !Array.isArray(section.body)) {
        const body = section.body as Skills;
        const selected = activeConfig.selectedItems.skills || { languages: [], technologies: [], softSkills: [] };
        
        return {
          ...section,
          body: {
            languages: (body.languages || []).filter(i => (selected.languages || []).includes(i.id)),
            technologies: (body.technologies || []).filter(i => (selected.technologies || []).includes(i.id)),
            softSkills: (body.softSkills || []).filter(i => (selected.softSkills || []).includes(i.id)),
          }
        };
      }

      if (Array.isArray(section.body)) {
        const key = type as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
        const selectedIds = (activeConfig.selectedItems[key] as number[]) || [];
        
        return {
          ...section,
          body: section.body.filter((item: { id: number }) => selectedIds.includes(item.id)),
        };
      }

      return section;
    }).filter((s): s is Exclude<typeof s, null> => s !== null);

    return {
      name: resumeSectionData.name,
      description: resumeSectionData.description,
      lastUpdate: resumeSectionData.lastUpdate,
      personalInfo: resumeSectionData.personalInfo,
      sections: filteredSections as ResumeSection[],
    };
  }, [resumeSectionData, activeConfig]);


  const toggleItem = useCallback((sectionType: SectionTypeValue, itemId: number, subType?: string) => {
    setConfigs(prev => {
      const newConfigs = prev.map(c => {
        if (c.id !== activeConfigId) return c;

        const newSelectedItems = {
          ...c.selectedItems,
          skills: { ...c.selectedItems.skills }
        };

        if (sectionType === SectionType.Skills && subType) {
          const key = subType as keyof ResumeConfig['selectedItems']['skills'];
          const current = newSelectedItems.skills[key] || [];
          newSelectedItems.skills[key] = current.includes(itemId)
            ? current.filter(id => id !== itemId)
            : [...current, itemId];
        } else {
          const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
          const current = (newSelectedItems[key] as number[]) || [];
          (newSelectedItems as any)[key] = current.includes(itemId)
            ? current.filter((id: number) => id !== itemId)
            : [...current, itemId];
        }

        return { ...c, selectedItems: newSelectedItems };
      });
      setIsDirty(true);
      return newConfigs;
    });
  }, [activeConfigId]);

  const toggleAll = useCallback((sectionType: SectionTypeValue, itemIds: number[], subType?: string, forceState?: boolean) => {
    setConfigs(prev => {
      const newConfigs = prev.map(c => {
        if (c.id !== activeConfigId) return c;

        const newSelectedItems = {
          ...c.selectedItems,
          skills: { ...c.selectedItems.skills }
        };

        if (sectionType === SectionType.Skills && subType) {
          const key = subType as keyof ResumeConfig['selectedItems']['skills'];
          const current = newSelectedItems.skills[key] || [];
          const allSelected = itemIds.every(id => current.includes(id));
          const targetState = forceState !== undefined ? forceState : !allSelected;

          newSelectedItems.skills[key] = targetState
            ? Array.from(new Set([...current, ...itemIds]))
            : current.filter(id => !itemIds.includes(id));
        } else {
          const key = sectionType as keyof Omit<ResumeConfig['selectedItems'], 'skills'>;
          const current = (newSelectedItems[key] as number[]) || [];
          const allSelected = itemIds.every(id => current.includes(id));
          const targetState = forceState !== undefined ? forceState : !allSelected;

          (newSelectedItems as any)[key] = targetState
            ? Array.from(new Set([...current, ...itemIds]))
            : current.filter((id: number) => !itemIds.includes(id));
        }

        return { ...c, selectedItems: newSelectedItems };
      });
      setIsDirty(true);
      return newConfigs;
    });
  }, [activeConfigId]);

  const moveSection = useCallback((index: number, direction: "up" | "down") => {
    setConfigs(prev => {
      const newConfigs = prev.map(c => {
        if (c.id !== activeConfigId) return c;
        const newOrder = [...c.sectionOrder];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newOrder.length) return c;
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        return { ...c, sectionOrder: newOrder };
      });
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
    if (raw) setConfigs(JSON.parse(raw));
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
      if (prev.length <= 1) return prev; // Don't delete last config
      const filtered = prev.filter(c => c.id !== id);
      if (activeConfigId === id) {
        setActiveConfigId(filtered[0].id);
      }
      return filtered;
    });
    setIsDirty(true);
  }, [activeConfigId]);

  const renameConfig = useCallback((id: string, name: string) => {
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, name } : c));
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
    save,
    cancel,
    setActiveConfigId,
    createNewConfig,
    deleteConfig,
    renameConfig,
    loading: globalLoading || !resumeSectionData || configs.length === 0,
  };
}
