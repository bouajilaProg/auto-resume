"use client";

import { Code, Layers, Users } from "lucide-react";
import SectionEditorLayout from "@/components/SectionEditorLayout";
import SkillSection from "./components/SkillsSection";
import { skillType } from "@/types/resumeTypes";
import { useSkills } from "@hooks/ResumeSections/useSkills";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useMemo } from "react";

export default function SkillsPage() {
  const { openModal, closeModal } = useModal();

  const ConfirmDeleteModal = useMemo(() => ModalCreator("ConfirmDelete", closeModal), [closeModal]);

  const handleConfirmRemove = (type: keyof typeof skills, id: number, doRemove: () => void) => {
    openModal({
      ...ConfirmDeleteModal,
      buttons: ConfirmDeleteModal.buttons.map(btn =>
        btn.text === "Delete"
          ? { ...btn, onClick: () => { doRemove(); closeModal(); } }
          : btn
      )
    });
  };

  const {
    skills,
    addSkill,
    removeSkill,
    updateSkill,
    handleSave,
    hasChanges,
    loading
  } = useSkills(handleConfirmRemove);

  // Memoize bound skill actions to maintain stable references for SkillSection components
  const langActions = useMemo(() => ({
    add: (name: string) => addSkill(skillType.LANG, name),
    remove: (id: number) => removeSkill(skillType.LANG, id),
    update: (id: number, name: string) => updateSkill(skillType.LANG, id, name),
  }), [addSkill, removeSkill, updateSkill]);

  const techActions = useMemo(() => ({
    add: (name: string) => addSkill(skillType.TECH, name),
    remove: (id: number) => removeSkill(skillType.TECH, id),
    update: (id: number, name: string) => updateSkill(skillType.TECH, id, name),
  }), [addSkill, removeSkill, updateSkill]);

  const softActions = useMemo(() => ({
    add: (name: string) => addSkill(skillType.SOFT, name),
    remove: (id: number) => removeSkill(skillType.SOFT, id),
    update: (id: number, name: string) => updateSkill(skillType.SOFT, id, name),
  }), [addSkill, removeSkill, updateSkill]);

  const ConfirmSaveModal = useMemo(() => ModalCreator("ConfirmSave", closeModal, () => {
    handleSave();
  }), [closeModal, handleSave]);

  if (loading || !skills || Object.keys(skills).length === 0) {
    return <Loading />;
  }

  return (
    <SectionEditorLayout
      title="Skills & Expertise"
      description="Showcase your technical proficiency and soft skills."
      onSave={() => {
        if (hasChanges) openModal(ConfirmSaveModal);
        else handleSave();
      }}
    >
      {/* Content Sections */}
      <div className="grid gap-4">
        <SkillSection
          title="Programming Languages"
          description="Languages you speak fluently (e.g., Python, JavaScript, C++)"
          icon={<Code className="text-white" />}
          skills={skills.languages || []}
          onAdd={langActions.add}
          onRemove={langActions.remove}
          onUpdate={langActions.update}
          colorTheme="blue"
        />

        <SkillSection
          title="Technologies & Tools"
          description="Frameworks, libraries, and dev tools (e.g., React, AWS, Docker)"
          icon={<Layers className="text-white" />}
          skills={skills.technologies || []}
          onAdd={techActions.add}
          onRemove={techActions.remove}
          onUpdate={techActions.update}
          colorTheme="emerald"
        />

        <SkillSection
          title="Soft Skills"
          description="Interpersonal abilities and leadership (e.g., Communication, Agile)"
          icon={<Users className="text-white" />}
          skills={skills.softSkills || []}
          onAdd={softActions.add}
          onRemove={softActions.remove}
          onUpdate={softActions.update}
          colorTheme="purple"
        />
      </div>
    </SectionEditorLayout>
  );
}
