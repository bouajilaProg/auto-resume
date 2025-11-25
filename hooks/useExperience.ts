import { useState } from "react";
import { WorkExperience } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";

export function useExperience() {
  const { updateResumeSectionData } = useResumeSectionData();
  const [experiences, setExperiences] = useState<WorkExperience[]>(
    mockResumeData.experiences ?? []
  );

  const addExperience = () => {
    const newId =
      experiences.length > 0
        ? Math.max(...experiences.map((e) => e.id)) + 1
        : 1;

    // remove completely empty entries
    const cleaned = experiences.filter(
      (e) => e.jobTitle.trim() !== "" || e.company.trim() !== ""
    );

    setExperiences([
      ...cleaned,
      {
        id: newId,
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        summary: "",
        keywords: "",
      },
    ]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const updateExperience = (
    id: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    setExperiences(
      experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = () => {
    const cleaned = experiences.filter(
      (e) => e.jobTitle.trim() !== "" || e.company.trim() !== ""
    );
    setExperiences(cleaned);
    updateResumeSectionData(SECTIONS.EXPERIENCE, cleaned);
  };

  return {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    handleSave,
  };
}
