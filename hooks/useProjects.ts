import { useState } from "react";
import { Project } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockResumeData.projects ?? []);

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
  };

  return {
    projects,
    addProject,
    removeProject,
    updateProject,
    handleSave,
  };
}
