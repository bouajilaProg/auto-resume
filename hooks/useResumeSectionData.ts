"use client";
import { Resume, SectionTypeValue, PersonalInfo, ResumeSection, DEFAULT_RESUME } from "@/types/resumeTypes";
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LEGACY_RESUME_DATA_KEY = "resumeDataKey";
const RESUME_DATA_BY_ID_KEY = "resumeDataById";
const RESUME_ORDER_KEY = "resumeOrder";
const ACTIVE_RESUME_ID_KEY = "activeResumeId";
const MIN_LOADING_TIME = 800;

type ResumesById = Record<string, Resume>;

const cloneResume = (resume: Resume) => {
  if (typeof structuredClone === "function") {
    return structuredClone(resume);
  }
  return JSON.parse(JSON.stringify(resume)) as Resume;
};

const normalizeOrder = (order: string[], ids: string[]) => {
  const seen = new Set<string>();
  const normalized = order.filter(id => {
    if (!ids.includes(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  ids.forEach(id => {
    if (!seen.has(id)) normalized.push(id);
  });
  return normalized;
};

function useResumeSectionDataInternal() {
  const [resumeSectionData, setResumeSectionData] = useState<Resume | null>(null);
  const [resumesById, setResumesById] = useState<ResumesById>({});
  const [resumeOrder, setResumeOrder] = useState<string[]>([]);
  const [activeResumeId, setActiveResumeIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const persistResumes = useCallback((data: { resumes: ResumesById; order: string[]; activeId: string }) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(RESUME_DATA_BY_ID_KEY, JSON.stringify(data.resumes));
    localStorage.setItem(RESUME_ORDER_KEY, JSON.stringify(data.order));
    localStorage.setItem(ACTIVE_RESUME_ID_KEY, data.activeId);
  }, []);

  const readResumeData = useCallback(async () => {
    setLoading(true);
    const start = Date.now();

    if (typeof window === "undefined") {
      setLoading(false);
      return null;
    }

    let resumes: ResumesById = {};
    let order: string[] = [];
    let activeId: string | null = localStorage.getItem(ACTIVE_RESUME_ID_KEY);
    let didMigrate = false;

    const rawResumes = localStorage.getItem(RESUME_DATA_BY_ID_KEY);
    if (rawResumes) {
      try {
        const parsed = JSON.parse(rawResumes);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          resumes = parsed as ResumesById;
        }
      } catch (e) {
        console.error("Invalid resume map in localStorage:", e);
      }
    }

    const rawOrder = localStorage.getItem(RESUME_ORDER_KEY);
    if (rawOrder) {
      try {
        const parsed = JSON.parse(rawOrder);
        if (Array.isArray(parsed)) {
          order = parsed as string[];
        }
      } catch (e) {
        console.error("Invalid resume order in localStorage:", e);
      }
    }

    if (Object.keys(resumes).length === 0) {
      const legacyRaw = localStorage.getItem(LEGACY_RESUME_DATA_KEY);
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(legacyRaw);
          if (parsed && typeof parsed === "object") {
            resumes = { default: parsed as Resume };
            order = ["default"];
            activeId = "default";
            didMigrate = true;
          }
        } catch (e) {
          console.error("Invalid legacy resume JSON:", e);
        }
      }
    }

    if (Object.keys(resumes).length === 0) {
      resumes = { default: cloneResume(DEFAULT_RESUME) };
      order = ["default"];
      activeId = "default";
      didMigrate = true;
    }

    const ids = Object.keys(resumes);
    order = normalizeOrder(order, ids);

    const params = new URLSearchParams(window.location.search);
    const resumeIdParam = params.get("resumeId");
    if (resumeIdParam && resumes[resumeIdParam]) {
      activeId = resumeIdParam;
    }

    if (!activeId || !resumes[activeId]) {
      activeId = order[0] || ids[0] || "default";
    }

    if (didMigrate) {
      localStorage.removeItem(LEGACY_RESUME_DATA_KEY);
      persistResumes({ resumes, order, activeId });
    }

    const elapsed = Date.now() - start;
    if (elapsed < MIN_LOADING_TIME) {
      await new Promise(res => setTimeout(res, MIN_LOADING_TIME - elapsed));
    }

    setLoading(false);
    return { resumes, order, activeId };
  }, [persistResumes]);

  const syncResumeSectionData = useCallback((updated: Resume) => {
    if (typeof window === "undefined" || !activeResumeId) return;
    setResumesById(prev => {
      const next = { ...prev, [activeResumeId]: updated };
      persistResumes({ resumes: next, order: resumeOrder, activeId: activeResumeId });
      return next;
    });
    setResumeSectionData(updated);
  }, [activeResumeId, persistResumes, resumeOrder]);

  const updateSection = useCallback((type: SectionTypeValue, body: unknown) => {
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
  }, [resumeSectionData, syncResumeSectionData]);

  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo) => {
    if (!resumeSectionData) return;
    const updated = { ...resumeSectionData, personalInfo };
    syncResumeSectionData(updated);
  }, [resumeSectionData, syncResumeSectionData]);

  const setActiveResumeId = useCallback((id: string) => {
    if (!resumesById[id]) return;
    setActiveResumeIdState(id);
    setResumeSectionData(resumesById[id]);
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_RESUME_ID_KEY, id);
      const params = new URLSearchParams(window.location.search);
      params.set("resumeId", id);
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }, [resumesById]);

  const createResume = useCallback((name: string, description?: string) => {
    const newId = crypto.randomUUID();
    const base = cloneResume(DEFAULT_RESUME);
    const newResume = {
      ...base,
      name,
      description: description ?? base.description,
      lastUpdate: new Date().toLocaleDateString(),
    } as Resume;

    const nextResumes = { ...resumesById, [newId]: newResume };
    const nextOrder = [...resumeOrder, newId];

    setResumesById(nextResumes);
    setResumeOrder(nextOrder);
    setActiveResumeIdState(newId);
    setResumeSectionData(newResume);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("resumeId", newId);
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", nextUrl);
    }
    persistResumes({ resumes: nextResumes, order: nextOrder, activeId: newId });

    return newId;
  }, [persistResumes, resumeOrder, resumesById]);

  const duplicateResume = useCallback((sourceId: string, name?: string) => {
    const source = resumesById[sourceId];
    if (!source) return null;
    const newId = crypto.randomUUID();
    const cloned = cloneResume(source);
    const newResume = {
      ...cloned,
      name: name || `Copy of ${source.name}`,
      lastUpdate: new Date().toLocaleDateString(),
    } as Resume;

    const nextResumes = { ...resumesById, [newId]: newResume };
    const nextOrder = [...resumeOrder, newId];

    setResumesById(nextResumes);
    setResumeOrder(nextOrder);
    setActiveResumeIdState(newId);
    setResumeSectionData(newResume);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("resumeId", newId);
      const nextUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", nextUrl);
    }
    persistResumes({ resumes: nextResumes, order: nextOrder, activeId: newId });

    return newId;
  }, [persistResumes, resumeOrder, resumesById]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readResumeData();
      if (data) {
        setResumesById(data.resumes);
        setResumeOrder(data.order);
        setActiveResumeIdState(data.activeId);
        setResumeSectionData(data.resumes[data.activeId] || null);
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          params.set("resumeId", data.activeId);
          const nextUrl = `${window.location.pathname}?${params.toString()}`;
          window.history.replaceState({}, "", nextUrl);
        }
      }
    };
    fetchData();
  }, [readResumeData]);

  const resumes = useMemo(() => {
    return resumeOrder
      .map(id => {
        const resume = resumesById[id];
        if (!resume) return null;
        return {
          id,
          name: resume.name,
          description: resume.description,
          lastUpdate: resume.lastUpdate,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [resumeOrder, resumesById]);

  return {
    resumeSectionData,
    resumes,
    activeResumeId,
    setActiveResumeId,
    createResume,
    duplicateResume,
    updateSection,
    updatePersonalInfo,
    loading,
  };
}

// Fix #5: Context provider so all consumers share a single instance
type ResumeSectionDataContextType = ReturnType<typeof useResumeSectionDataInternal>;

const ResumeSectionDataContext = createContext<ResumeSectionDataContextType | null>(null);

export function ResumeSectionDataProvider({ children }: { children: React.ReactNode }) {
  const value = useResumeSectionDataInternal();
  return createElement(ResumeSectionDataContext.Provider, { value }, children);
}

export default function useResumeSectionData() {
  const ctx = useContext(ResumeSectionDataContext);
  if (!ctx) {
    throw new Error("useResumeSectionData must be used within ResumeSectionDataProvider");
  }
  return ctx;
}
