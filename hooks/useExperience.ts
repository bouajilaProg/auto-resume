import { WorkExperience, WorkExperienceSchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useExperience() {
  const {
    items: experiences,
    addItem: addExperience,
    removeItem: removeExperience,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<WorkExperience>(
    SectionType.WorkExperience,
    z.array(WorkExperienceSchema),
    (e) => e.jobTitle.trim() !== "" || e.company.trim() !== ""
  );

  const updateExperience = <K extends keyof WorkExperience>(id: number, field: K, value: WorkExperience[K]) => {
    updateItem(id, field, value);
  };

  return {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}

