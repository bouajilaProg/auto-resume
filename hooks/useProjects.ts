import { useEffect, useState } from "react";
import { Project } from "@/types/resumeTypes";
import useResumeSectionData, { SECTIONS } from "./useResumeSectionData";

export function useProjects() {
  const { resumeSectionData, updateResumeSectionData, loading } = useResumeSectionData();
  const [projects, setProjects] = useState<Project[]>([] as Project[]);

  useEffect(
    () => {
      setProjects(
        resumeSectionData?.projects ?? []
      );
    }, [resumeSectionData]
  )

  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;

    // clean empty projects
    const cleaned = projects.filter(p => p.title.trim() !== "");

    setProjects([
      ...cleaned,
      { id: newId, title: "", description: "", tools: "", projectLink: "", repoLink: "" },
    ]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setProjects(projects.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = () => {
    const cleaned = projects.filter(p => p.title.trim() !== "");
    setProjects(cleaned);
    updateResumeSectionData(SECTIONS.PROJECTS, cleaned);
  };

  return {
    projects,
    addProject,
    removeProject,
    updateProject,
    handleSave,
    loading
  };
}
