import { useState } from "react";
import { PersonalInfo, Contact } from "@/types/resumeTypes";
import { mockResumeData } from "@/db/mock-data";

export function usePersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    mockResumeData.personalInfo
  );

  const updateName = (name: string) => {
    setPersonalInfo({ ...personalInfo, name });
  };

  const updateLocation = (location: string) => {
    setPersonalInfo({ ...personalInfo, location });
  };

  const updateDescription = (description: string) => {
    setPersonalInfo({ ...personalInfo, description });
  };

  const updateContacts = (contacts: Contact[]) => {
    setPersonalInfo({ ...personalInfo, contact: contacts });
  };

  const updateHobbies = (hobbies: string) => {
    setPersonalInfo({
      ...personalInfo,
      hobbies: hobbies.split(",").map((hobby) => hobby.trim()),
    });
  };

  const handleSave = () => {
    const cleanedContacts = personalInfo.contact.filter(
      (contact) => contact.value.trim() !== ""
    );
    const cleanedHobbies = personalInfo.hobbies.filter(
      (hobby) => hobby.trim() !== ""
    );
    setPersonalInfo({ ...personalInfo, contact: cleanedContacts, hobbies: cleanedHobbies });
  };

  return {
    personalInfo,
    updateName,
    updateLocation,
    updateDescription,
    updateContacts,
    updateHobbies,
    handleSave,
  };
}
