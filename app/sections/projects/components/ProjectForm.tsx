import { Project } from "@/types/resumeTypes";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Link as LinkIcon,
  Github,
  Wrench,
  AlignLeft,
  Lightbulb
} from "lucide-react";

export default function ProjectForm({
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
        if (field === "notes") {
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
            <div className="p-3 rounded-lg bg-indigo-600 text-white shadow-sm">
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-indigo-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-sm">
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
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.title ? "border-red-500 bg-red-50/10" : "border-gray-200"
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
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.tools ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="React, Node.js, AWS..."
              />
            </div>
            {errors?.tools && <p className="text-xs text-red-500 mt-1">{errors.tools}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor={`description-${project.id}`}
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
          >
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              <AlignLeft size={12} />
            </div>
            <textarea
              id={`notes-${project.id}`}
              value={project.notes.join("\n")}
              onChange={handleFieldChange("notes")}
              className={`w-full pl-9 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 min-h-[100px] bg-white ${errors?.notes ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="Describe the problem you solved and the impact of this project..."
            />
          </div>
          {errors?.notes && <p className="text-xs text-red-500 mt-1">{errors.notes}</p>}
        </div>

        {/* Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor={`projectLink-${project.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Live Link
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
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 text-sm bg-white ${errors?.projectLink ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="https://my-app.com"
              />
            </div>
            {errors?.projectLink && <p className="text-xs text-red-500 mt-1">{errors.projectLink}</p>}
          </div>

          <div>
            <label
              htmlFor={`repoLink-${project.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Repository
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Github size={14} />
              </div>
              <input
                id={`repoLink-${project.id}`}
                type="url"
                value={project.repoLink || ""}
                onChange={handleFieldChange("repoLink")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 text-sm bg-white ${errors?.repoLink ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="https://github.com/user/repo"
              />
            </div>
            {errors?.repoLink && <p className="text-xs text-red-500 mt-1">{errors.repoLink}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
