import { EducationItem, EducationItemSchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useEducation(onConfirmRemove?: (id: number, doRemove: () => void) => void) {
  const {
    items: educations,
    addItem: addEducation,
    removeItem: removeEducation,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<EducationItem>(
    SectionType.Education,
    z.array(EducationItemSchema),
    (edu) => edu.institution.trim() !== "" || edu.degreeName.trim() !== "",
    onConfirmRemove
  );

  const updateEducation = <K extends keyof EducationItem>(id: number, field: K, value: EducationItem[K]) => {
    updateItem(id, field, value);
  };

  return {
    educations,
    addEducation,
    removeEducation,
    updateEducation,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}


