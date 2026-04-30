import { ModalType } from "../ModalContext";
import { ConfirmSaveModal } from "./ConfirmSaveModal";
import { DeleteItemModal } from "./DeleteItemModal";
import { DeleteVersionModal } from "./DeleteVersionModal";
import { CreateVersionModal } from "./CreateVersionModal";

export type ModalKind = "ConfirmSave" | "DeleteItem" | "DeleteVersion" | "CreateVersion" | "Logout";

export default function ModalCreator(kind: ModalKind, closeModal: () => void, onAction?: () => void, onCreate?: (name: string) => void): ModalType {
  switch (kind) {
    case "ConfirmSave":
      return ConfirmSaveModal(closeModal, onAction);
    case "DeleteItem":
      return DeleteItemModal(closeModal, onAction);
    case "DeleteVersion":
      return DeleteVersionModal(closeModal, onAction);
    case "CreateVersion":
      return CreateVersionModal(closeModal, onCreate!);
    // case "Logout":
    //   return LogoutModal(closeModal, onAction);
    default:
      throw new Error(`Unknown modal kind: ${kind}`);
  }
}
