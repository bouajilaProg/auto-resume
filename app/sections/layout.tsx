import Modal from "@/components/Modal";
import { ModalProvider } from "@/context/Modal/ModalContext";
import type { ReactNode } from "react";

export default function SectionLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 flex flex-col">
      <ModalProvider>
        {children}
        {/* Render the Modal component here so it can access the context */}
        <Modal />
      </ModalProvider>
    </main>
  );
}
