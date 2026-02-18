"use client";

import React from "react";
import { Resume } from "@/types/resumeTypes";
import { useState, useEffect, useRef, useCallback } from "react";
import { Save, X, Download, Loader2, FileText, Eye, AlertTriangle, RefreshCw } from "lucide-react";

interface PreviewPaneProps {
  resume: Resume | null;
  isDirty: boolean;
  onSave: () => void;
  onCancel: () => void;
}

function PreviewPane({
  resume,
  isDirty,
  onSave,
  onCancel,
}: PreviewPaneProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pdfUrlRef = useRef<string | null>(null);

  // Fix #9: Use refs for isDirty/onSave so the listener only mounts once
  const isDirtyRef = useRef(isDirty);
  const onSaveRef = useRef(onSave);
  isDirtyRef.current = isDirty;
  onSaveRef.current = onSave;

  // Shortcut for Save (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (isDirtyRef.current) onSaveRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // runs once

  // Fix #1: Use ref for pdfUrl so compilePdf identity stays stable
  const compilePdf = useCallback(async () => {
    if (!resume) {
      console.warn("No resume data available for PDF compilation");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });

      if (response.ok) {
        const blob = await response.blob();
        if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
        const url = URL.createObjectURL(blob);
        pdfUrlRef.current = url;
        setPdfUrl(url);
      } else {
        const errorText = await response.text();
        console.error("Returned error from compile API:", errorText);
        try {
          const parsed = JSON.parse(errorText);
          setError(parsed.error || "Failed to compile PDF");
        } catch {
          setError(errorText || "Failed to compile PDF");
        }
      }
    } catch (error) {
      console.error("Error compiling PDF:", error);
      setError("An unexpected error occurred during PDF compilation");
    } finally {
      setLoading(false);
    }
  }, [resume]); // pdfUrl removed -- use ref instead

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      compilePdf();
    }, 800);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [compilePdf]); // only compilePdf (stable unless resume changes)

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${resume?.name || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-200/50 relative border-l border-gray-300">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b border-gray-300 px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FileText size={20} className="text-primary-600" />
            <span className="font-bold">Live Preview</span>
            {loading && <Loader2 size={16} className="animate-spin text-primary-500 ml-2" />}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={!isDirty}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30 transition-all"
          >
            <X size={16} />
            <span>Discard</span>
          </button>

          <button
            onClick={onSave}
            disabled={!isDirty}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-md ${isDirty
              ? "bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200"
              : "bg-gray-100 text-gray-400 grayscale cursor-not-allowed"
              }`}
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <button
            onClick={handleDownload}
            disabled={!pdfUrl}
            className="flex items-center gap-2 px-4 py-2 bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 rounded-lg font-bold text-sm transition-all shadow-sm"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 p-8 overflow-hidden flex flex-col items-center justify-start">
        {error ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded-lg border-2 border-dashed border-red-200 p-12 text-center animate-in fade-in duration-500">
            <div className="p-4 bg-red-100 text-red-600 rounded-full mb-6">
              <AlertTriangle size={48} />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2 uppercase tracking-tight">Compilation Error</h3>
            <p className="text-red-700 font-medium max-w-md mb-8 whitespace-pre-wrap leading-relaxed bg-white/50 p-4 rounded-xl border border-red-100 shadow-sm">
              {error}
            </p>
            <button 
              onClick={() => compilePdf()}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              Retry Compilation
            </button>
          </div>
        ) : pdfUrl ? (
          <div className="w-full h-full bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-300 relative group">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title="Resume Preview"
            />
            {loading && (
              <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-white p-4 rounded-full shadow-xl">
                  <Loader2 size={32} className="animate-spin text-primary-600" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Eye size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Generating your preview...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(PreviewPane);
