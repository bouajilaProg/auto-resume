"use client";

import { useState, useEffect, useCallback } from "react";
import { Resume, SectionTypeValue, SectionType } from "@/types/resumeTypes";
import useResumeSectionData from "./useResumeSectionData";

export default function useResumeEditor() {
  const { resumeSectionData, loading: globalLoading } = useResumeSectionData();
  const [draft, setDraft] = useState<Resume | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize draft when data is loaded
  useEffect(() => {
    if (resumeSectionData && !draft) {
      setDraft(JSON.parse(JSON.stringify(resumeSectionData)));
    }
  }, [resumeSectionData, draft]);

  const toggleItem = useCallback((sectionType: SectionTypeValue, itemId: number, subType?: string) => {
    setDraft((prev) => {
      if (!prev) return null;
      
      const newSections = prev.sections.map((section: any) => {
        if (section.type !== sectionType) return section;

        if (section.type === SectionType.Skills) {
          const body = { ...section.body };
          if (subType && (subType === 'languages' || subType === 'technologies' || subType === 'softSkills')) {
            const key = subType as keyof typeof body;
            body[key] = body[key].map((item: any) =>
              item.id === itemId ? { ...item, enabled: !item.enabled } : item
            );
            return { ...section, body };
          }
        } else if (Array.isArray(section.body)) {
          return {
            ...section,
            body: section.body.map((item: any) =>
              item.id === itemId ? { ...item, enabled: !item.enabled } : item
            ),
          };
        }
        return section;
      });

      setIsDirty(true);
      return { ...prev, sections: newSections };
    });
  }, []);

  const moveSection = useCallback((index: number, direction: "up" | "down") => {
    setDraft((prev) => {
      if (!prev) return null;
      const order = prev.sectionOrder || prev.sections.map(s => s.type);
      const newOrder = [...order];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newOrder.length) return prev;

      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setIsDirty(true);
      return { ...prev, sectionOrder: newOrder };
    });
  }, []);

  const save = useCallback(() => {
    if (!draft) return;
    localStorage.setItem('resumeDataKey', JSON.stringify(draft));
    setIsDirty(false);
    // Notify other components or just refresh
    window.dispatchEvent(new Event('storage'));
  }, [draft]);

  const cancel = useCallback(() => {
    if (resumeSectionData) {
      setDraft(JSON.parse(JSON.stringify(resumeSectionData)));
      setIsDirty(false);
    }
  }, [resumeSectionData]);

  return {
    draft,
    isDirty,
    toggleItem,
    moveSection,
    save,
    cancel,
    loading: globalLoading || !draft,
  };
}
