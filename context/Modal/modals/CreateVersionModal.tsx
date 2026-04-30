import { ModalType } from "../ModalContext";
import CreateVersionModalContent from "@/app/main/components/CreateVersionModalContent";

export function CreateVersionModal(
  closeModal: () => void,
  onCreate: (name: string) => void
): ModalType {
  return {
    title: "Create a new version",
    description: "Give this version a short name so you can quickly find it later.",
    content: (
      <CreateVersionModalContent
        onCancel={closeModal}
        onCreate={(name: string) => {
          onCreate(name);
          closeModal();
        }}
      />
    ),
    buttons: [],
  };
}