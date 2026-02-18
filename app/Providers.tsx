"use client";

import { ResumeSectionDataProvider } from "@/hooks/useResumeSectionData";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ResumeSectionDataProvider>{children}</ResumeSectionDataProvider>;
}
