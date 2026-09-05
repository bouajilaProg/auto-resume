"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Download, ChevronLeft, Loader2, FileText, RefreshCw, Info } from "lucide-react";
import useResumeSectionData from "@/hooks/useResumeSectionData";
import { SectionType, PROFICIENCY_LEVELS } from "@/types/resumeTypes";
import type { Resume } from "@/types/resumeTypes";

function assembleFullResume(data: Resume): Resume {
  const sections = (data.sections || []).map((section) => {
    if (section.type === SectionType.Languages && Array.isArray(section.body)) {
      return {
        ...section,
        body: (section.body as Array<{ id: number; name: string; proficiency?: string }>).map((lang) => ({
          ...lang,
          proficiency:
            lang.proficiency && (PROFICIENCY_LEVELS as readonly string[]).includes(lang.proficiency)
              ? lang.proficiency
              : "Intermediate",
        })),
      };
    }
    return section;
  });

  return {
    name: data.name,
    description: data.description,
    lastUpdate: data.lastUpdate,
    personalInfo: data.personalInfo,
    sections,
  } as Resume;
}

export default function MobileView() {
  const { resumes, resumeSectionData, setActiveResumeId, loading } = useResumeSectionData();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pdfUrlRef = useRef<string | null>(null);

  const handleSelectResume = useCallback(
    (id: string) => {
      setError(null);
      setActiveResumeId(id);
      setIsPreviewOpen(true);
    },
    [setActiveResumeId],
  );

  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false);
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current);
      pdfUrlRef.current = null;
    }
    setPdfUrl(null);
    setError(null);
  }, []);

  const compilePdf = useCallback(async () => {
    if (!resumeSectionData) return;
    const assembled = assembleFullResume(resumeSectionData);

    setPdfLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assembled),
      });

      if (response.ok) {
        const blob = await response.blob();
        if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
        const url = URL.createObjectURL(blob);
        pdfUrlRef.current = url;
        setPdfUrl(url);
      } else {
        const errorText = await response.text();
        try {
          const parsed = JSON.parse(errorText);
          setError(parsed.error || "Failed to compile PDF");
        } catch {
          setError(errorText || "Failed to compile PDF");
        }
      }
    } catch {
      setError("An unexpected error occurred during PDF compilation");
    } finally {
      setPdfLoading(false);
    }
  }, [resumeSectionData]);

  useEffect(() => {
    if (isPreviewOpen && resumeSectionData) {
      compilePdf();
    }
  }, [isPreviewOpen, compilePdf, resumeSectionData]);

  useEffect(() => {
    return () => {
      if (pdfUrlRef.current) {
        URL.revokeObjectURL(pdfUrlRef.current);
      }
    };
  }, []);

  const handleDownload = useCallback(() => {
    if (pdfUrl && resumeSectionData) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${resumeSectionData.name || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [pdfUrl, resumeSectionData]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 text-gray-400">
        <Loader2 size={40} className="animate-spin text-primary-600" />
        <p className="text-sm font-medium">Loading your resumes…</p>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        <div className="p-4 bg-primary-500/10 rounded-2xl text-primary-400 ring-1 ring-primary-500/20">
          <FileText size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">No Resumes Yet</h2>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            Create your first resume on desktop to view and download it here on mobile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-1">
          <FileText size={24} className="text-primary-600" />
          <h2 className="text-xl font-black tracking-tight">Your Resumes</h2>
        </div>
        <p className="text-gray-400 text-xs font-medium -mt-2 mb-2">
          Tap a resume to preview and download
        </p>

        {resumes.map((resume) => (
          <button
            key={resume.id}
            onClick={() => handleSelectResume(resume.id)}
            className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all text-left"
          >
            <span className="text-sm font-bold">{resume.name}</span>
            {resume.lastUpdate && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                Updated {resume.lastUpdate}
              </span>
            )}
          </button>
        ))}
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-50">
          <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shrink-0">
            <button
              onClick={handleClosePreview}
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>

            <span className="text-sm font-bold text-gray-900 truncate max-w-[140px]">
              {resumeSectionData?.name || "Resume"}
            </span>

            <button
              onClick={handleDownload}
              disabled={!pdfUrl || pdfLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 disabled:opacity-30 transition-all"
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col items-center justify-center p-4">
            {error ? (
              <div className="w-full flex flex-col items-center gap-4 text-center">
                <div className="p-3 bg-red-500/10 rounded-full text-red-400">
                  <Info size={32} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                  Could not generate preview. Make sure your resume has content in at least one
                  section.
                </p>
                <button
                  onClick={compilePdf}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all"
                >
                  <RefreshCw size={16} className={pdfLoading ? "animate-spin" : ""} />
                  Try Again
                </button>
              </div>
            ) : pdfUrl ? (
              <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none"
                  title="Resume Preview"
                />
                {pdfLoading && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <Loader2 size={40} className="animate-spin text-primary-600" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-400">
                <Loader2 size={40} className="animate-spin text-primary-600" />
                <p className="text-sm font-medium">Generating preview…</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
