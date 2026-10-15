"use client";

import { useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { SectionEditorContext, SectionBackLink } from "@/context/SectionEditorContext";

interface SectionEditorLayoutProps {
  title: string;
  description: string;
  onSave: () => void;
  children: ReactNode;
}

export default function SectionEditorLayout({ title, description, onSave, children }: SectionEditorLayoutProps) {
  const closePanel = useContext(SectionEditorContext);
  const layout = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (closePanel) layout.current?.querySelector<HTMLButtonElement>("[data-section-back]")?.focus();
  }, [closePanel]);

  return (
    <div ref={layout} className={`flex min-h-0 min-w-0 flex-col bg-gray-50 ${closePanel ? "h-full" : "h-dvh"}`}>
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-3">
        <div className={closePanel ? "space-y-2" : "mx-auto max-w-4xl space-y-2"}>
          <div className="min-w-0">
            <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
            {!closePanel && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
          </div>
          <div className="flex items-center justify-end gap-2">
            <SectionBackLink className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
              <ArrowLeft size={15} /> Back
            </SectionBackLink>
            <button onClick={onSave} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700">
              <Save size={15} /> Save
            </button>
          </div>
        </div>
      </header>

      <div data-editor-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
        <div className={`@container space-y-4 text-sm ${closePanel ? "" : "mx-auto max-w-4xl"}`}>
          {children}
        </div>
      </div>

    </div>
  );
}
