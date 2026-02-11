import { useEffect, useState, useRef, useMemo } from "react";
import { PersonalInfo, Contact, PersonalInfoSchema, Hobby, SectionType } from "@/types/resumeTypes";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { useRouter } from "next/navigation";

export function usePersonalInfo() {
  const { resumeSectionData, updatePersonalInfo: savePersonalInfo, updateSection, loading } = useResumeSectionData();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    location: "",
    description: "",
    contact: [],
  } as PersonalInfo);
  
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [initialData, setInitialData] = useState<{ personalInfo: PersonalInfo; hobbies: Hobby[] } | null>(null);
  const isInitialized = useRef(false);
  
  const router = useRouter();

  useEffect(() => {
    if (!loading && resumeSectionData && !isInitialized.current) {
      let currentPersonalInfo = personalInfo;
      let currentHobbies = hobbies;

      if (resumeSectionData.personalInfo) {
        currentPersonalInfo = resumeSectionData.personalInfo;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPersonalInfo(currentPersonalInfo);
      }
      const hobbiesSection = resumeSectionData.sections?.find(s => s.type === SectionType.Hobbies);
      if (hobbiesSection) {
        currentHobbies = hobbiesSection.body as Hobby[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHobbies(currentHobbies);
      }
      
      const initData = {
        personalInfo: JSON.parse(JSON.stringify(currentPersonalInfo)),
        hobbies: JSON.parse(JSON.stringify(currentHobbies))
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialData(initData);
      
      isInitialized.current = true;
    }
  }, [resumeSectionData, loading]);

  const hasChangesValue = useMemo(() => {
    if (!initialData) return false;
    
    const currentPersonalInfo = JSON.stringify(personalInfo);
    const initialPersonalInfo = JSON.stringify(initialData.personalInfo);
    
    const currentHobbies = JSON.stringify(hobbies);
    const initialHobbies = JSON.stringify(initialData.hobbies);
    
    return currentPersonalInfo !== initialPersonalInfo || currentHobbies !== initialHobbies;
  }, [personalInfo, hobbies, initialData]);

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

  const updateHobbies = (hobbiesStr: string) => {
    const hobbyNames = hobbiesStr.split(",").map(h => h.trim()).filter(h => h !== "");
    const newHobbies = hobbyNames.map((name, index) => ({
      id: index + 1,
      name
    }));
    setHobbies(newHobbies);
  };

  const handleSave = () => {
    const cleanedContacts = personalInfo.contact
      .filter((contact) => contact.value.trim() !== "")
      .map((contact) => ({
        ...contact,
        value: contact.value.trim(),
      }));

    const updatedPersonalInfo = {
      ...personalInfo,
      contact: cleanedContacts,
    };

    // Validation
    const result = PersonalInfoSchema.safeParse(updatedPersonalInfo);
    if (!result.success) {
      console.error("Validation failed for PersonalInfo:", result.error);
    }

    setPersonalInfo(updatedPersonalInfo);
    savePersonalInfo(updatedPersonalInfo);
    updateSection(SectionType.Hobbies, hobbies);
    
    router.push("/sections");
  };

  return {
    personalInfo,
    hobbies,
    updateName,
    updateLocation,
    updateDescription,
    updateContacts,
    updateHobbies,
    handleSave,
    hasChanges: hasChangesValue,
    loading,
  };
}
