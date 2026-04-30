import { ExtraCurricularActivity, ExtraCurricularActivitySchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useExtraCurricular(onConfirmRemove?: (id: number) => void | Promise<void>) {
  const {
    items: activities,
    addItem: addActivity,
    removeItem: removeActivity,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<ExtraCurricularActivity>(
    SectionType.ExtraCurricular,
    z.array(ExtraCurricularActivitySchema),
    (a) => a.activityName.trim() !== "" || a.startDate.trim() !== "",
    onConfirmRemove
  );

  const updateActivity = <K extends keyof ExtraCurricularActivity>(id: number, field: K, value: ExtraCurricularActivity[K]) => {
    updateItem(id, field, value);
  };

  return {
    activities,
    addActivity,
    removeActivity,
    updateActivity,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}
