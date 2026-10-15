"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { SectionEditorContext } from "@/context/SectionEditorContext";
import { SECTION_LABELS } from "@/constants/sections";

const EDITORS = {
  personalInfo: dynamic(() => import("@/app/sections/personal-info/page")),
  education: dynamic(() => import("@/app/sections/education/page")),
  work_experience: dynamic(() => import("@/app/sections/experience/page")),
  project: dynamic(() => import("@/app/sections/projects/page")),
  certification: dynamic(() => import("@/app/sections/certifications/page")),
  extracurricular: dynamic(() => import("@/app/sections/extracurricular/page")),
  hobbies: dynamic(() => import("@/app/sections/hobbies/page")),
  languages: dynamic(() => import("@/app/sections/languages/page")),
  skills: dynamic(() => import("@/app/sections/skills/page")),
};

export type EditableSection = keyof typeof EDITORS;

export default function SectionEditorPanel({ active, visited, onClose }: {
  active: EditableSection | null;
  visited: EditableSection[];
  onClose: () => void;
}) {
  const backButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (active) backButton.current?.focus();
  }, [active]);

  return (
    <SectionEditorContext.Provider value={onClose}>
      <section
        hidden={!active}
        aria-label={`${active ? SECTION_LABELS[active] : "Section"} editor`}
        className="absolute inset-0 z-20 flex flex-col bg-gray-50"
      >
        <div className="shrink-0 border-b border-gray-200 bg-white p-4">
          <button ref={backButton} onClick={onClose} className="flex items-center gap-2 font-semibold text-primary-600">
            <ArrowLeft size={18} /> Back to items
          </button>
          <p className="mt-2 text-xs text-gray-500">Your selections and unsaved form drafts stay here while you edit. Save Changes applies details to all versions of this resume.</p>
        </div>
        {visited.map(type => {
          const Editor = EDITORS[type];
          return (
            <div key={type} hidden={active !== type} className="min-h-0 flex-1 overflow-y-auto">
              <Editor />
            </div>
          );
        })}
      </section>
    </SectionEditorContext.Provider>
  );
}
