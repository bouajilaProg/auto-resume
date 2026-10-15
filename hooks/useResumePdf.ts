"use client";

import { useCallback, useEffect, useState } from "react";
import type { Resume } from "@/types/resumeTypes";
import { getResumePdf, serializeResume } from "@/utils/resumePdf";

export default function useResumePdf(resume: Resume | null, enabled = true, delay = 0) {
  const [attempt, setAttempt] = useState(0);
  const key = enabled && resume ? serializeResume(resume) : "";
  const [result, setResult] = useState({ key: "", attempt: -1, url: "", blob: null as Blob | null, error: "" });
  const retry = useCallback(() => setAttempt(value => value + 1), []);

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    let url: string | undefined;
    const timer = setTimeout(async () => {
      try {
        const blob = await getResumePdf(JSON.parse(key) as Resume);
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setResult({ key, attempt, url, blob, error: "" });
      } catch (error) {
        if (!cancelled) {
          setResult({ key, attempt, url: "", blob: null, error: error instanceof Error ? error.message : "Unable to connect to the PDF service. Please try again." });
        }
      }
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (url) URL.revokeObjectURL(url);
    };
  }, [key, attempt, delay]);

  const current = result.key === key && result.attempt === attempt;
  return {
    pdfUrl: current ? result.url : null,
    pdfBlob: current ? result.blob : null,
    error: current ? result.error : null,
    loading: !!key && !current,
    retry,
  };
}
