import { Language, LanguageSchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useLanguages(onConfirmRemove?: (id: number, doRemove: () => void) => void) {
  const {
    items: languages,
    addItem: addLanguage,
    removeItem: removeLanguage,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<Language>(
    SectionType.Languages,
    z.array(LanguageSchema),
    (l) => l.name.trim() !== "",
    onConfirmRemove
  );

  const updateLanguage = <K extends keyof Language>(id: number, field: K, value: Language[K]) => {
    updateItem(id, field, value);
  };

  return {
    languages,
    addLanguage,
    removeLanguage,
    updateLanguage,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}
