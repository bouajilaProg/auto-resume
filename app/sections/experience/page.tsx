"use client";

import { Plus, Briefcase } from "lucide-react";
import ExperienceForm from "./components/ExperienceForm";
import SectionEditorLayout from "@/components/SectionEditorLayout";
import { useExperience } from "@hooks/ResumeSections/useExperience";
import Loading from "@/app/components/Loading";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useModal } from "@/context/Modal/useModal";
import { useMemo } from "react";

export default function ExperiencePage() {
  const { openModal, closeModal } = useModal();

  const ConfirmDeleteModal = useMemo(() => ModalCreator("ConfirmDelete", closeModal), [closeModal]);

  const {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    handleSave,
    hasChanges,
    loading,
    errors
  } = useExperience((id: number, doRemove: () => void) => {
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
      title="Work Experience"
      description="Showcase your professional work history and career achievements."
      onSave={() => {
        if (hasChanges) openModal(ConfirmSaveModal);
        else handleSave();
      }}
    >
      {/* Content Area */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-primary-300 transition-colors group">
            <div className="w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Briefcase size={22} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">No work experience added</h3>
            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
              Your career history is the core of your resume. Add your previous roles here.
            </p>
            <button
              onClick={addExperience}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-sm font-medium"
            >
              <Plus size={14} />
              Add Experience
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {experiences.map((experience, index) => (
                <ExperienceForm
                  key={experience.id}
                  experience={experience}
                  index={index}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  errors={errors?.[experience.id]}
                />
              ))}
            </div>

            {/* Add New Button (Bottom) */}
            <button
              onClick={addExperience}
              className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-colors">
                <Plus size={12} />
              </div>
              Add Another Role
            </button>
          </>
        )}
      </div>
    </SectionEditorLayout>
  );
}
