import { ModalType } from "../ModalContext";

export function DeleteVersionModal(
  closeModal: () => void,
  onAction?: () => void
): ModalType {
  return {
    title: "Delete this version?",
    description:
      "This action can't be undone. We'll remove this version and keep your other resumes safe.",
    buttons: [
      { text: "Cancel", onClick: closeModal, variant: "secondary" },
      {
        text: "Delete",
        onClick: () => {
          onAction?.();
          closeModal();
        },
        variant: "danger",
      },
    ],
  };
}