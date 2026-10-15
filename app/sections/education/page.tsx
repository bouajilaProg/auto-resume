"use client";

import { Plus, GraduationCap } from "lucide-react";
import EducationForm from "./components/EducationForm";
import SectionEditorLayout from "@/components/SectionEditorLayout";
import { useEducation } from "@hooks/ResumeSections/useEducation";
import Loading from "@/app/components/Loading";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useModal } from "@/context/Modal/useModal";
import { useMemo } from "react";

export default function EducationPage() {
  const { openModal, closeModal } = useModal();

  const ConfirmDeleteModal = useMemo(() => ModalCreator("ConfirmDelete", closeModal), [closeModal]);

  const {
    educations,
    addEducation,
    removeEducation,
    updateEducation,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useEducation((id: number, doRemove: () => void) => {
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

  if (!educations || loading) {
    return <Loading />;
  }

  return (
    <SectionEditorLayout
      title="Education"
      description="Add your academic background, degrees, and certificates."
      onSave={() => {
        if (hasChanges) openModal(ConfirmSaveModal);
        else handleSave();
      }}
    >
      {/* Content Area */}
      <div className="space-y-4">
        {educations.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-primary-300 transition-colors group">
            <div className="w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap size={22} />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
              No education added yet
            </h3>

            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
              Highlighting your academic background helps employers understand your foundation.
            </p>

            <button
              onClick={addEducation}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition shadow-sm font-medium"
            >
              <Plus size={14} />
              Add Education
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {educations.map((edu, index) => (
                <EducationForm
                  key={edu.id}
                  errors={errors?.[edu.id]}
                  edu={edu}
                  index={index}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                />
              ))}
            </div>

            {/* Add New Button */}
            <button
              onClick={addEducation}
              className="w-full py-2.5 border border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-colors">
                <Plus size={12} />
              </div>
              Add Another Education Entry
            </button>
          </>
        )}
      </div>
    </SectionEditorLayout>
  );
}
