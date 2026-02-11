import { Project, ProjectSchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useProjects() {
  const {
    items: projects,
    addItem: addProject,
    removeItem: removeProject,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<Project>(
    SectionType.Project,
    z.array(ProjectSchema),
    (p) => p.title.trim() !== ""
  );

  const updateProject = <K extends keyof Project>(id: number, field: K, value: Project[K]) => {
    updateItem(id, field, value);
  };

  return {
    projects,
    addProject,
    removeProject,
    updateProject,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}
