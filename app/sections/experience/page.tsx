"use client";

import { Plus, Briefcase, Save, X } from "lucide-react";
import ExperienceForm from "./components/ExperienceForm";
import Link from "next/link";
import { useExperience } from "@hooks/ResumeSections/useExperience";
import Loading from "@/app/components/Loading";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useModal } from "@/context/Modal/useModal";
import { useMemo } from "react";

export default function ExperiencePage() {
  const {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    handleSave,
    hasChanges,
    loading,
    errors
  } = useExperience();

  const { openModal, closeModal } = useModal();
  const ConfirmModal = useMemo(() => ModalCreator("ConfirmSave", closeModal, () => {
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Work Experience</h1>
            <p className="text-gray-500 mt-1">
              Showcase your professional work history and career achievements.
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
                  openModal(ConfirmModal);
                } else {
                  handleSave();
                }
              }}
              className="flex-1 sm:flex-none justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center gap-2 font-medium shadow-md"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {experiences.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-indigo-300 transition-colors group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No work experience added</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Your career history is the core of your resume. Add your previous roles here.
              </p>
              <button
                onClick={addExperience}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm font-medium"
              >
                <Plus size={14} />
                Add Experience
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
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
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2 font-medium group"
              >
                <div className="p-2 bg-gray-100 rounded-full group-hover:bg-indigo-100 transition-colors">
                  <Plus size={12} />
                </div>
                Add Another Role
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
