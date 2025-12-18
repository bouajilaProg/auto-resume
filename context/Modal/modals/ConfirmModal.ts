import { ModalType } from "../ModalContext";

export function ConfirmSaveModal(closeModal: () => void, onAction?: () => void): ModalType {
  return {
    title: 'Confirm Save',
    description: 'Are you sure you want to save the changes?',
    buttons: [
      { text: 'Cancel', onClick: closeModal, variant: 'secondary' },
      { text: 'Save', onClick: () => { onAction?.(); closeModal(); }, variant: 'primary' },
    ],
  };
}
