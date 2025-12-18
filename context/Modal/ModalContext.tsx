"use client";
import { createContext, useState, useCallback, ReactNode } from "react";

export interface ButtonConfig {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export interface ModalContextType {
  title: string;
  description: string;
  buttons: ButtonConfig[];
  isOpen: boolean;
  openModal: (config: { title: string; description: string; buttons?: ButtonConfig[] }) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export type ModalType = Omit<ModalContextType, "isOpen" | "openModal" | "closeModal">;

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    buttons: [] as ButtonConfig[],
    isOpen: false,
  });

  const openModal = useCallback(
    ({ title, description, buttons = [] }: { title: string; description: string; buttons?: ButtonConfig[] }) => {
      setState({ title, description, buttons, isOpen: true });
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
