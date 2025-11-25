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
const MIN_LOADING_TIME = 300;


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

  const updateResumeSectionData = (field: SECTIONS, value: any) => {
    if (!resumeSectionData) return;

    const updated = { ...resumeSectionData, [field]: value };
    syncResumeSectionData(updated);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await readResumeData();
      if (data) {
        setResumeSectionData(data);
      } else {
        setResumeSectionData({} as Resume);
      }
    };

    fetchData();
  }, []);


  return { resumeSectionData, updateResumeSectionData, loading };
}

