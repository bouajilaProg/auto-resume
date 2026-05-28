"use client";

import { Plus, FolderKanban, Save, X } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Projects
            </h1>
            <p className="text-gray-500 mt-1">
              Showcase your technical achievements and professional work.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/main"
              className="flex-1 sm:flex-none justify-center px-4 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center gap-2 font-medium shadow-sm"
            >
              <X size={14} />
              <span>Cancel</span>
            </Link>

            <button
              onClick={() => {
                if (hasChanges) {
                  openModal(ConfirmSaveModal);
                } else {
                  handleSave();
                }
              }}
              className="flex-1 sm:flex-none justify-center px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-lg transition-all flex items-center gap-2 font-medium shadow-md"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {projects.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-primary-300 transition-colors group">
              <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FolderKanban size={32} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                No projects added yet
              </h3>

              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Projects demonstrate your practical skills. Add your best work here.
              </p>

              <button
                onClick={addProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-sm font-medium"
              >
                <Plus size={14} />
                Add Project
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
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
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
              >
                <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-colors">
                  <Plus size={12} />
                </div>
                Add Another Project
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
