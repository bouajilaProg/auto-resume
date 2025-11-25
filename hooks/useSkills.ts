import { useEffect, useState } from "react";
import { Skills, skillType } from "@/types/resumeTypes";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";
import { useRouter } from "next/navigation";

export function useSkills() {
  const { resumeSectionData, updateResumeSectionData, loading } = useResumeSectionData();
  const [skills, setSkills] = useState<Skills>({} as Skills);

  const router = useRouter();
  useEffect(
    () => {
      setSkills(
        resumeSectionData?.skills ?? { languages: [], technologies: [], softSkills: [] } as Skills
      );
    }, [resumeSectionData]
  )

  const addSkill = (type: skillType) => (name: string) => {
    setSkills(prevSkills => {
      const skillList = prevSkills[type];
      const newId = skillList.length > 0 ? Math.max(...skillList.map(s => s.id)) + 1 : 1;

      return {
        ...prevSkills,
        [type]: [...skillList, { id: newId, type, name }]
      };
    });
  };

  const removeSkill = (type: skillType) => (id: number) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].filter(s => s.id !== id)
    }));
  };

  const updateSkill = (type: skillType) => (id: number, name: string) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].map(s => s.id === id ? { ...s, name } : s)
    }));
  };

  const handleSave = () => {
    updateResumeSectionData(SECTIONS.SKILLS, skills);
    router.push("/sections")
  };

  return {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    handleSave,
    loading
  };
}
