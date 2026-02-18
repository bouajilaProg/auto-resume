import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { PersonalInfo, Contact, PersonalInfoSchema } from "@/types/resumeTypes";
import useResumeSectionData from "@hooks/useResumeSectionData";
import { useRouter } from "next/navigation";

export function usePersonalInfo() {
  const { resumeSectionData, updatePersonalInfo: savePersonalInfo, loading } = useResumeSectionData();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    location: "",
    description: "",
    contact: [],
  } as PersonalInfo);
  
  const [initialData, setInitialData] = useState<{ personalInfo: PersonalInfo } | null>(null);
  const isInitialized = useRef(false);
  
  const router = useRouter();

  useEffect(() => {
    if (!loading && resumeSectionData && !isInitialized.current) {
      let currentPersonalInfo = personalInfo;

      if (resumeSectionData.personalInfo) {
        currentPersonalInfo = resumeSectionData.personalInfo;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPersonalInfo(currentPersonalInfo);
      }
      
      const initData = {
        personalInfo: JSON.parse(JSON.stringify(currentPersonalInfo)),
      };
      setInitialData(initData);
      
      isInitialized.current = true;
    }
  }, [resumeSectionData, loading, personalInfo]);

  const hasChangesValue = useMemo(() => {
    if (!initialData) return false;
    
    const currentPersonalInfo = JSON.stringify(personalInfo);
    const initialPersonalInfo = JSON.stringify(initialData.personalInfo);
    
    return currentPersonalInfo !== initialPersonalInfo;
  }, [personalInfo, initialData]);

  // Fix #13: Use functional state updates so callbacks don't depend on personalInfo
  const updateName = useCallback((name: string) => {
    setPersonalInfo(prev => ({ ...prev, name }));
  }, []);

  const updateLocation = useCallback((location: string) => {
    setPersonalInfo(prev => ({ ...prev, location }));
  }, []);

  const updateDescription = useCallback((description: string) => {
    setPersonalInfo(prev => ({ ...prev, description }));
  }, []);

  const updateContacts = useCallback((contacts: Contact[]) => {
    setPersonalInfo(prev => ({ ...prev, contact: contacts }));
  }, []);

  const handleSave = () => {
    const cleanedContacts = (personalInfo.contact || [])
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
    
    router.push("/sections");
  };

  const removeContact = (id: number) => {
    if (typeof window !== "undefined" && !confirm("Delete this contact method?")) return;
    
    const nextContacts = (personalInfo.contact || []).filter(c => c.id !== id);
    const nextPersonalInfo = { ...personalInfo, contact: nextContacts };
    
    setPersonalInfo(nextPersonalInfo);
    savePersonalInfo(nextPersonalInfo);
    setInitialData({ personalInfo: JSON.parse(JSON.stringify(nextPersonalInfo)) });
  };

  return {
    personalInfo,
    updateName,
    updateLocation,
    updateDescription,
    updateContacts,
    removeContact,
    handleSave,
    hasChanges: hasChangesValue,
    loading,
  };
}
