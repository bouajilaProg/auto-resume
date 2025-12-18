import { ModalType } from "../ModalContext";
import { ConfirmSaveModal } from "./ConfirmModal";

export type ModalKind = "ConfirmSave" | "DeleteItem" | "Logout";

export default function ModalCreator(kind: ModalKind, closeModal: () => void, onAction?: () => void): ModalType {
  switch (kind) {
    case "ConfirmSave":
      return ConfirmSaveModal(closeModal, onAction);
    // case "DeleteItem":
    //   return DeleteItemModal(closeModal, onAction);
    // case "Logout":
    //   return LogoutModal(closeModal, onAction);
    default:
      throw new Error(`Unknown modal kind: ${kind}`);
  }
}
