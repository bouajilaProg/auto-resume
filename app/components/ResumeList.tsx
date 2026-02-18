"use client";

import useResumeEditor from "@/hooks/useResumeEditor";
import ResumeItem from "./ResumeItem";
import { Loader2, Plus } from "lucide-react";

function ResumeList() {
  const {
    resumes,
    loading,
    createResume,
    duplicateResume,
  } = useResumeEditor();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card */}
        <button
          onClick={() => {
            const name = prompt("Enter resume name:");
            if (name) createResume(name);
          }}
          className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
            <Plus size={24} />
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900">Create New Resume</p>
            <p className="text-xs text-gray-500 mt-1">Start from a fresh template</p>
          </div>
        </button>

        {resumes.map((resume) => (
          <ResumeItem
            key={resume.id}
            id={resume.id}
            name={resume.name}
            description={resume.description}
            lastUpdate={resume.lastUpdate}
            onCopy={(id) => {
              duplicateResume(id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ResumeList;
