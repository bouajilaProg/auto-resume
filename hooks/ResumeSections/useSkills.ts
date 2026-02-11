import { useEffect, useState, useRef, useMemo } from "react";
import { Skills, SectionType } from "@/types/resumeTypes";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { useRouter } from "next/navigation";

export function useSkills() {
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialSkills(JSON.parse(JSON.stringify(skillsData)));
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInitialSkills({
          languages: [],
          technologies: [],
          softSkills: [],
        });
      }
      isInitialized.current = true;
    }
  }, [resumeSectionData, loading]);

  const hasChanges = useMemo(() => 
    JSON.stringify(skills) !== JSON.stringify(initialSkills),
    [skills, initialSkills]
  );

  const addSkill = (type: keyof Skills) => (name: string) => {
    setSkills(prevSkills => {
      const skillList = prevSkills[type];
      const newId = skillList.length > 0 ? Math.max(...skillList.map(s => s.id)) + 1 : 1;

      return {
        ...prevSkills,
        [type]: [...skillList, { id: newId, type: type === 'languages' ? 'LANG' : type === 'technologies' ? 'TECH' : 'SOFT', name }]
      };
    });
  };

  const removeSkill = (type: keyof Skills) => (id: number) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].filter(s => s.id !== id)
    }));
  };

  const updateSkill = (type: keyof Skills) => (id: number, name: string) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [type]: prevSkills[type].map(s => (s.id === id ? { ...s, name } : s))
    }));
  };

  const handleSave = () => {
    updateSection(SectionType.Skills, skills);
    router.push("/sections");
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
