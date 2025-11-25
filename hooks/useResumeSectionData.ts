"use client"
import { EducationItem, PersonalInfo, Project, Resume } from "@/types/resumeTypes";
import { useEffect, useState } from "react";

export enum SECTIONS {
  PERSONAL_INFO = "personalInfo",
  EDUCATION = "educations",
  PROJECTS = "projects",
  EXPERIENCE = "experiences",
  SKILLS = "skills",
  CERTIFICATIONS = "certifications",
  EXTRACURRICULARS = "extracurriculars",
}

const RESUME_DATA_KEY = 'resumeDataKey';


export default function useResumeSectionData() {
  const [resumeSectionData, setResumeSectionData] = useState<Resume | null>(null);

  const readResumeData = () => {
    if (typeof window === "undefined") return null;

    const raw = localStorage.getItem(RESUME_DATA_KEY);
    if (!raw) return null;

    try {
      const data = JSON.parse(raw);
      return typeof data === "object" && data !== null ? (data as Resume) : null;
    } catch (e) {
      console.error("Invalid JSON in localStorage:", e);
      return null;
    }
  };

  const syncResumeSectionData = (updated: Resume) => {
    if (typeof window === "undefined") return;

    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(updated));
    setResumeSectionData(updated);
  };

  const updateResumeSectionData = (field: SECTIONS, value: any) => {
    if (!resumeSectionData) return;

    const updated = { ...resumeSectionData, [field]: value };
    syncResumeSectionData(updated);
  };

  useEffect(() => {
    const data = readResumeData();
    if (data) {
      setResumeSectionData(data);
    } else {
      setResumeSectionData({} as Resume);
    }
  }, []);

  return { resumeSectionData, updateResumeSectionData };
}

