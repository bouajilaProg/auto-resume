"use client";
import { createContext, useState, useCallback, ReactNode } from "react";

export interface ButtonConfig {
  text: string;
  onClick: () => void | boolean;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export interface ModalContextType {
  title: string;
  description: string;
  content?: ReactNode;
  buttons: ButtonConfig[];
  isOpen: boolean;
  openModal: (config: { title: string; description: string; content?: ReactNode; buttons?: ButtonConfig[] }) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export type ModalType = Omit<ModalContextType, "isOpen" | "openModal" | "closeModal">;

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    content: undefined as ReactNode | undefined,
    buttons: [] as ButtonConfig[],
    isOpen: false,
  });

  const openModal = useCallback(
    ({ title, description, content, buttons = [] }: { title: string; description: string; content?: ReactNode; buttons?: ButtonConfig[] }) => {
      setState({ title, description, content, buttons, isOpen: true });
    },
    []
  );

  const closeModal = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
