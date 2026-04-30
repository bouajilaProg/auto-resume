import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Skills, SectionType } from "@/types/resumeTypes";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { useRouter } from "next/navigation";

export function useSkills(onConfirmRemove?: (type: keyof Skills, id: number, doRemove: () => void) => void) {
  const { resumeSectionData, updateSection, loading } = useResumeSectionData();
  const [skills, setSkills] = useState<Skills>({
    languages: [],
    technologies: [],
    softSkills: [],
  });
  const [initialSkills, setInitialSkills] = useState<Skills | null>(null);
  const isInitialized = useRef(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading && resumeSectionData && !isInitialized.current) {
      const section = resumeSectionData.sections?.find(s => s.type === SectionType.Skills);
      if (section) {
        const skillsData = section.body as Skills;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSkills(skillsData);
        setInitialSkills(JSON.parse(JSON.stringify(skillsData)));
      } else {
        setInitialSkills({
          languages: [],
          technologies: [],
          softSkills: [],
        });
      }
      isInitialized.current = true;
    }
  }, [resumeSectionData, loading, skills]);

  const hasChanges = useMemo(() => 
    JSON.stringify(skills) !== JSON.stringify(initialSkills),
    [skills, initialSkills]
  );

  // Fix #10: Uncurried useCallback versions to avoid new function references every render
  const addSkill = useCallback((type: keyof Skills, name: string) => {
    setSkills(prevSkills => {
      const skillList = prevSkills[type] || [];
      const newId = skillList.length > 0 ? Math.max(...skillList.map(s => s.id)) + 1 : 1;

      return {
        ...prevSkills,
        [type]: [...skillList, { id: newId, type: type === 'languages' ? 'LANG' : type === 'technologies' ? 'TECH' : 'SOFT', name }]
      };
    });
  }, []);

  const removeSkill = useCallback((type: keyof Skills, id: number) => {
    const doRemove = () => {
      setSkills(prevSkills => {
        const nextSkills = {
          ...prevSkills,
          [type]: (prevSkills[type] || []).filter(s => s.id !== id)
        };
        updateSection(SectionType.Skills, nextSkills);
        setInitialSkills(JSON.parse(JSON.stringify(nextSkills)));
        return nextSkills;
      });
    };

    if (onConfirmRemove) {
      onConfirmRemove(type, id, doRemove);
      return;
    }

    if (typeof window !== "undefined" && !confirm("Delete this skill?")) return;

    doRemove();
  }, [updateSection, onConfirmRemove]);

  const updateSkill = useCallback((type: keyof Skills, id: number, name: string) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: (prevSkills[type] || []).map(s => (s.id === id ? { ...s, name } : s))
    }));
  }, []);

  const handleSave = () => {
    updateSection(SectionType.Skills, skills);
    router.push("/main");
  };

  return {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    handleSave,
    hasChanges,
    loading,
  };
}
