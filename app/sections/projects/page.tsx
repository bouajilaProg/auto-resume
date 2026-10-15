"use client";

import { Plus, FolderKanban } from "lucide-react";
import SectionEditorLayout from "@/components/SectionEditorLayout";
import ProjectForm from "./components/ProjectForm";
import { useProjects } from "@hooks/ResumeSections/useProjects";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useMemo } from "react";

export default function ProjectsPage() {
  const { openModal, closeModal } = useModal();

  const ConfirmDeleteModal = useMemo(() => ModalCreator("ConfirmDelete", closeModal), [closeModal]);

  const {
    projects,
    addProject,
    removeProject,
    updateProject,
    handleSave,
    hasChanges,
    loading,
    errors
  } = useProjects((id: number, doRemove: () => void) => {
    openModal({
      ...ConfirmDeleteModal,
      buttons: ConfirmDeleteModal.buttons.map(btn =>
        btn.text === "Delete"
          ? { ...btn, onClick: () => { doRemove(); closeModal(); } }
          : btn
      )
    });
  });

  const ConfirmSaveModal = useMemo(() => ModalCreator("ConfirmSave", closeModal, () => {
    handleSave();
  }), [closeModal, handleSave]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SectionEditorLayout
      title="Projects"
      description="Showcase your technical achievements and professional work."
      onSave={() => {
        if (hasChanges) openModal(ConfirmSaveModal);
        else handleSave();
      }}
    >
      {/* Content Area */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-primary-300 transition-colors group">
            <div className="w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FolderKanban size={22} />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
              No projects added yet
            </h3>

            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
              Projects demonstrate your practical skills. Add your best work here.
            </p>

            <button
              onClick={addProject}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-sm font-medium"
            >
              <Plus size={14} />
              Add Project
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {projects.map((project, index) => (
                <ProjectForm
                  key={project.id}
                  project={project}
                  index={index}
                  updateProject={updateProject}
                  removeProject={removeProject}
                  errors={errors?.[project.id]}
                />
              ))}
            </div>

            {/* Add New Button (Bottom) */}
            <button
              onClick={addProject}
              className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-colors">
                <Plus size={12} />
              </div>
              Add Another Project
            </button>
          </>
        )}
      </div>
    </SectionEditorLayout>
  );
}
