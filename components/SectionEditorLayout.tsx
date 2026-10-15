"use client";

import { useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Save, X } from "lucide-react";
import { SectionEditorContext, SectionBackLink } from "@/context/SectionEditorContext";

interface SectionEditorLayoutProps {
  title: string;
  description: string;
  onSave: () => void;
  children: ReactNode;
}

export default function SectionEditorLayout({ title, description, onSave, children }: SectionEditorLayoutProps) {
  const closePanel = useContext(SectionEditorContext);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (closePanel) closeButton.current?.focus();
  }, [closePanel]);

  return (
    <div className={`flex min-h-0 min-w-0 flex-col bg-gray-50 ${closePanel ? "h-full" : "h-dvh"}`}>
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <div className={`min-w-0 ${closePanel ? "" : "mx-auto w-full max-w-4xl"}`}>
          <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
          {!closePanel && <p className="mt-0.5 text-sm text-gray-500">{description}</p>}
        </div>
        {closePanel && (
          <button ref={closeButton} onClick={closePanel} aria-label="Close section editor" className="shrink-0 rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <X size={18} />
          </button>
        )}
      </header>

      <div data-editor-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
        <div className={`@container space-y-4 text-sm ${closePanel ? "" : "mx-auto max-w-4xl"}`}>
          {children}
        </div>
      </div>

      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-3">
        <div className={closePanel ? "" : "mx-auto max-w-4xl"}>
          {closePanel && <p className="mb-2 text-xs text-gray-500">Changes apply to all versions of this resume.</p>}
          <div className="flex items-center justify-end gap-2">
            <SectionBackLink className="inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </SectionBackLink>
            <button onClick={onSave} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700">
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
