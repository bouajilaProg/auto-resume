"use client"
import { Resume, SectionTypeValue, PersonalInfo, ResumeSection, DEFAULT_RESUME } from "@/types/resumeTypes";
import { useEffect, useState } from "react";

const RESUME_DATA_KEY = 'resumeDataKey';
const MIN_LOADING_TIME = 800;

export default function useResumeSectionData() {
  const [resumeSectionData, setResumeSectionData] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  const readResumeData = async () => {
    setLoading(true);
    const start = Date.now();

    if (typeof window === "undefined") {
      setLoading(false);
      return null;
    }

    const raw = localStorage.getItem(RESUME_DATA_KEY);
    if (!raw) {
      setLoading(false);
      return null;
    }

    try {
      const data = JSON.parse(raw);
      const elapsed = Date.now() - start;

      if (elapsed < MIN_LOADING_TIME) {
        await new Promise(res => setTimeout(res, MIN_LOADING_TIME - elapsed));
      }

      setLoading(false);
      return typeof data === "object" && data !== null ? (data as Resume) : null;
    } catch (e) {
      console.error("Invalid JSON in localStorage:", e);
      setLoading(false);
      return null;
    }
  };

  const syncResumeSectionData = (updated: Resume) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(updated));
    setResumeSectionData(updated);
  };

  const updateSection = (type: SectionTypeValue, body: unknown) => {
    if (!resumeSectionData) return;

    const sections = [...(resumeSectionData.sections || [])];
    const index = sections.findIndex(s => s.type === type);

    if (index > -1) {
      sections[index] = { ...sections[index], body } as ResumeSection;
    } else {
      sections.push({ type, body } as ResumeSection);
    }

    const updated = { ...resumeSectionData, sections };
    syncResumeSectionData(updated);
  };

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    if (!resumeSectionData) return;
    const updated = { ...resumeSectionData, personalInfo };
    syncResumeSectionData(updated);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await readResumeData();
      if (data) {
        setResumeSectionData(data);
      } else {
        setResumeSectionData(DEFAULT_RESUME);
      }
    };
    fetchData();
  }, []);

  return { resumeSectionData, updateSection, updatePersonalInfo, loading };
}
