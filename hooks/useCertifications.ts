
import { useState } from "react";
import { Certification } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>(
    mockResumeData.certifications ?? []
  );

  const addCertification = () => {
    const newId =
      certifications.length > 0
        ? Math.max(...certifications.map((c) => c.id)) + 1
        : 1;

    // remove completely empty certifications
    const cleaned = certifications.filter(
      (c) =>
        c.name.trim() !== "" ||
        c.issuingOrganization.trim() !== "" ||
        c.issueDate.trim() !== ""
    );

    setCertifications([
      ...cleaned,
      { id: newId, name: "", issuingOrganization: "", issueDate: "" },
    ]);
  };

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const updateCertification = (
    id: number,
    field: keyof Certification,
    value: string
  ) => {
    setCertifications(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = () => {
    const cleaned = certifications.filter(
      (c) =>
        c.name.trim() !== "" ||
        c.issuingOrganization.trim() !== "" ||
        c.issueDate.trim() !== ""
    );
    setCertifications(cleaned);
  };

  return {
    certifications,
    addCertification,
    removeCertification,
    updateCertification,
    handleSave,
  };
}
