import { Project } from "@/types/resumeTypes";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Link as LinkIcon,
  Wrench,
  AlignLeft,
  Lightbulb,
  FileText
} from "lucide-react";

function ProjectForm({
  project,
  index,
  updateProject,
  removeProject,
  errors,
}: {
  project: Project;
  index: number;
  updateProject: <K extends keyof Project>(id: number, field: K, value: Project[K]) => void;
  removeProject: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange =
    (field: keyof Project) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value: string | string[] = e.target.value;
        if (field === "highlights") {
          value = e.target.value.split("\n");
        }
        updateProject(project.id, field, value as Project[typeof field]);
      };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-primary-600 text-white shadow-sm">
              <Lightbulb size={20} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {project.title || "(Untitled Project)"}
              </h3>

              <p className="text-sm text-gray-500 flex items-center gap-2 truncate max-w-md">
                {project.tools ? (
                  <span className="flex items-center gap-1">
                    <Wrench className="text-gray-400" size={10} />
                    {project.tools}
                  </span>
                ) : (
                  <span className="text-gray-400">No tools listed</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeProject(project.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-primary-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary-600 text-white shadow-sm">
            <Lightbulb size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Project #{index + 1}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => removeProject(project.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">
        {/* Title & Tools Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor={`title-${project.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Project Title
            </label>
            <input
              id={`title-${project.id}`}
              type="text"
              value={project.title}
              onChange={handleFieldChange("title")}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.title ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g., E-Commerce Platform"
            />
            {errors?.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label
              htmlFor={`tools-${project.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Technologies Used
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Wrench size={12} />
              </div>
              <input
                id={`tools-${project.id}`}
                type="text"
                value={project.tools}
                onChange={handleFieldChange("tools")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.tools ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="React, Node.js, AWS..."
              />
            </div>
            {errors?.tools && <p className="text-xs text-red-500 mt-1">{errors.tools}</p>}
          </div>
        </div>

        {/* Summary */}
        <div>
          <label
            htmlFor={`summary-${project.id}`}
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
          >
            Summary
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              <FileText size={12} />
            </div>
            <textarea
              id={`summary-${project.id}`}
              value={project.summary || ""}
              onChange={handleFieldChange("summary")}
              className={`w-full pl-9 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 min-h-[80px] bg-white ${errors?.summary ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="Brief overview of the project..."
            />
          </div>
          {errors?.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
        </div>

        {/* Highlights */}
        <div>
          <label
            htmlFor={`highlights-${project.id}`}
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
          >
            Highlights
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              <AlignLeft size={12} />
            </div>
            <textarea
              id={`highlights-${project.id}`}
              value={(project.highlights || []).join("\n")}
              onChange={handleFieldChange("highlights")}
              className={`w-full pl-9 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 min-h-[100px] bg-white ${errors?.highlights ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="Key achievements or features (one per line)..."
            />
          </div>
          {errors?.highlights && <p className="text-xs text-red-500 mt-1">{errors.highlights}</p>}
        </div>

        {/* Links Row */}
        <div>
          <label
            htmlFor={`projectLink-${project.id}`}
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
          >
            Project Link
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <LinkIcon size={12} />
            </div>
            <input
              id={`projectLink-${project.id}`}
              type="url"
              value={project.projectLink || ""}
              onChange={handleFieldChange("projectLink")}
              className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-300 text-sm bg-white ${errors?.projectLink ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="https://my-app.com"
            />
          </div>
          {errors?.projectLink && <p className="text-xs text-red-500 mt-1">{errors.projectLink}</p>}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProjectForm);
