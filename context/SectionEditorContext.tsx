"use client";

import { createContext, useCallback, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export const SectionEditorContext = createContext<(() => void) | null>(null);

export function useReturnToEditor() {
  const closePanel = useContext(SectionEditorContext);
  const router = useRouter();
  return useCallback(() => {
    if (closePanel) closePanel();
    else router.push("/main");
  }, [closePanel, router]);
}

export function SectionBackLink({ children, className }: { children: ReactNode; className?: string }) {
  const closePanel = useContext(SectionEditorContext);
  return closePanel ? (
    <button type="button" onClick={closePanel} className={className}>Back to items</button>
  ) : (
    <Link href="/main" className={className}>{children}</Link>
  );
}
