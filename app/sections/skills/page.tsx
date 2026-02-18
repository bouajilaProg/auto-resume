"use client";

import { Code, Layers, Users, Save, X } from "lucide-react";
import Link from "next/link";
import SkillSection from "./components/SkillsSection";
import { skillType } from "@/types/resumeTypes";
import { useSkills } from "@hooks/ResumeSections/useSkills";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useMemo } from "react";

export default function SkillsPage() {
  const {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    handleSave,
    hasChanges,
    loading
  } = useSkills();

  const { openModal, closeModal } = useModal();
  const ConfirmModal = useMemo(() => ModalCreator("ConfirmSave", closeModal, () => {
    handleSave();
  }), [closeModal, handleSave]);

  if (loading || !skills || Object.keys(skills).length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Skills & Expertise
            </h1>
            <p className="text-gray-500 mt-1">
              Showcase your technical proficiency and soft skills.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/sections"
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

        {/* Content Sections */}
        <div className="grid gap-6">
          <SkillSection
            title="Programming Languages"
            description="Languages you speak fluently (e.g., Python, JavaScript, C++)"
            icon={<Code className="text-white" />}
            skills={skills.languages || []}
            onAdd={addSkill(skillType.LANG)}
            onRemove={removeSkill(skillType.LANG)}
            onUpdate={updateSkill(skillType.LANG)}
            colorTheme="blue"
          />

          <SkillSection
            title="Technologies & Tools"
            description="Frameworks, libraries, and dev tools (e.g., React, AWS, Docker)"
            icon={<Layers className="text-white" />}
            skills={skills.technologies || []}
            onAdd={addSkill(skillType.TECH)}
            onRemove={removeSkill(skillType.TECH)}
            onUpdate={updateSkill(skillType.TECH)}
            colorTheme="emerald"
          />

          <SkillSection
            title="Soft Skills"
            description="Interpersonal abilities and leadership (e.g., Communication, Agile)"
            icon={<Users className="text-white" />}
            skills={skills.softSkills || []}
            onAdd={addSkill(skillType.SOFT)}
            onRemove={removeSkill(skillType.SOFT)}
            onUpdate={updateSkill(skillType.SOFT)}
            colorTheme="purple"
          />
        </div>
      </div>
    </div>
  );
}
