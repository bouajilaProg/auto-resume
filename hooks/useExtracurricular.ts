import { useState } from "react";
import { ExtraCurricularActivity } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";

export function useExtraCurricular() {
  const { updateResumeSectionData } = useResumeSectionData();
  const [activities, setActivities] = useState<ExtraCurricularActivity[]>(
    mockResumeData.extracurriculars ?? []
  );

  const addActivity = () => {
    const newId =
      activities.length > 0
        ? Math.max(...activities.map((a) => a.id)) + 1
        : 1;

    // remove empty activities
    const cleaned = activities.filter(
      (a) => a.activityName.trim() !== "" || a.startDate.trim() !== ""
    );

    setActivities([
      ...cleaned,
      { id: newId, activityName: "", startDate: "", endDate: "" },
    ]);
  };

  const removeActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const updateActivity = (
    id: number,
    field: keyof ExtraCurricularActivity,
    value: string
  ) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSave = () => {
    const cleaned = activities.filter(
      (a) => a.activityName.trim() !== "" || a.startDate.trim() !== ""
    );
    setActivities(cleaned);
    updateResumeSectionData(SECTIONS.EXTRACURRICULARS, cleaned);
  };

  return {
    activities,
    addActivity,
    removeActivity,
    updateActivity,
    handleSave,
  };
}
