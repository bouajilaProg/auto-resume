import { ModalType } from "../ModalContext";

export function ConfirmDeleteModal
  (closeModal: () => void, onAction?: () => void): ModalType {
  return {
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    buttons: [
      { text: 'Cancel', onClick: closeModal, variant: 'secondary' },
      { text: 'Delete', onClick: () => { onAction?.(); closeModal(); }, variant: 'danger' },
    ],
  };
}
