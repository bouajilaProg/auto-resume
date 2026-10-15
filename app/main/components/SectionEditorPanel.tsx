"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
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
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (active) {
      panel.current?.querySelector<HTMLButtonElement>("[data-active-editor] [data-section-back]")?.focus();
    }
  }, [active]);

  return (
    <SectionEditorContext.Provider value={onClose}>
      <section
        ref={panel}
        hidden={!active}
        aria-label={`${active ? SECTION_LABELS[active] : "Section"} editor`}
        className="absolute inset-0 z-20 flex flex-col bg-gray-50"
      >
        {visited.map(type => {
          const Editor = EDITORS[type];
          return (
            <div
              key={type}
              hidden={active !== type}
              data-active-editor={active === type ? "" : undefined}
              className="min-h-0 min-w-0 flex-1"
            >
              <Editor />
            </div>
          );
        })}
      </section>
    </SectionEditorContext.Provider>
  );
}
