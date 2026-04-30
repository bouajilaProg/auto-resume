import { Certification, CertificationSchema, SectionType } from "@/types/resumeTypes";
import { useGenericListSection } from "./useGenericListSection";
import { z } from "zod";

export function useCertifications(onConfirmRemove?: (id: number) => void | Promise<void>) {
  const {
    items: certifications,
    addItem: addCertification,
    removeItem: removeCertification,
    updateItem,
    handleSave,
    hasChanges,
    loading,
    errors,
  } = useGenericListSection<Certification>(
    SectionType.Certification,
    z.array(CertificationSchema),
    (c) => c.name.trim() !== "" || c.issuingOrganization.trim() !== "",
    onConfirmRemove
  );

  const updateCertification = <K extends keyof Certification>(id: number, field: K, value: Certification[K]) => {
    updateItem(id, field, value);
  };

  return {
    certifications,
    addCertification,
    removeCertification,
    updateCertification,
    handleSave,
    hasChanges,
    loading,
    errors,
  };
}
