import { useState } from "react";
import { EducationItem, DegreeType } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";

export function useEducation() {

  const { updateResumeSectionData } = useResumeSectionData();

  const [educations, setEducations] = useState<EducationItem[]>(
    mockResumeData.educations ?? []
  );

  const addEducation = () => {
    const newId =
      educations.length > 0
        ? Math.max(...educations.map((e) => e.id)) + 1
        : 1;

    // remove completely empty entries
    const cleaned = educations.filter(
      (e) => e.degreeName.trim() !== "" || e.institution.trim() !== ""
    );

    setEducations([
      ...cleaned,
      {
        id: newId,
        degreeType: DegreeType.BS,
        degreeName: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter((e) => e.id !== id));
  };

  const updateEducation = (
    id: number,
    field: keyof EducationItem,
    value: string
  ) => {
    setEducations(
      educations.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSave = () => {
    const cleaned = educations.filter(
      (e) => e.degreeName.trim() !== "" || e.institution.trim() !== ""
    );
    setEducations(cleaned);
    updateResumeSectionData(SECTIONS.EDUCATION, cleaned);
  };

  return {
    educations,
    addEducation,
    removeEducation,
    updateEducation,
    handleSave,
  };
}
