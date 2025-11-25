import { useEffect, useState } from "react";
import { WorkExperience } from "@/types/resumeTypes";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";
import { useRouter } from "next/navigation";

export function useExperience() {
  const { resumeSectionData, updateResumeSectionData, loading } = useResumeSectionData();
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  const router = useRouter();
  useEffect(
    () => {
      setExperiences(
        resumeSectionData?.experiences ?? []
      );
    }, [resumeSectionData]
  )


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
    router.push("/sections")
  };

  return {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    handleSave,
    loading
  };
}
