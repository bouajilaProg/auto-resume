import { Resume } from "@/types/resumeTypes";

// The Strategy Interface is a function type
export type ResumeGenerator = (resume: Resume) => string;
