import { HobbiesSchema, SectionType, Hobby } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";

export function useHobbies(onConfirmRemove?: (id: number) => void | Promise<void>) {
  const {
    items: hobbies,
    addItem: addHobby,
    removeItem: removeHobby,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<Hobby>(
    SectionType.Hobbies,
    HobbiesSchema,
    (h) => h.name.trim() !== "",
    onConfirmRemove
  );

  const updateHobby = <K extends keyof Hobby>(id: number, field: K, value: Hobby[K]) => {
    updateItem(id, field, value);
  };

  return {
    hobbies,
    addHobby,
    removeHobby,
    updateHobby,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}
