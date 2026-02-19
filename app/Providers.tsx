"use client";

import Modal from "@/components/Modal";
import { ModalProvider } from "@/context/Modal/ModalContext";
import { ResumeSectionDataProvider } from "@/hooks/useResumeSectionData";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ResumeSectionDataProvider>
        {children}
        <Modal />
      </ResumeSectionDataProvider>
    </ModalProvider>
  );
}
