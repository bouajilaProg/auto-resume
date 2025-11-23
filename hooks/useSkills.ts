import { useState } from "react";
import { Skills, skillType } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";

export function useSkills() {
  const [skills, setSkills] = useState<Skills>(mockResumeData.skills);

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
    console.log("Saved Skills Data:", skills);
    alert("Changes saved! Check console for data.");
  };

  return {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    handleSave
  };
}
