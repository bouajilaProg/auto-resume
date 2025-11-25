import { Project } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaProjectDiagram, FaTrash, FaLink, FaGithub, FaTools, FaAlignLeft } from "react-icons/fa";

export default function ProjectForm({ project, index, updateProject, removeProject }: {
  project: Project;
  index: number;
  updateProject: (id: number, field: keyof Project, value: string) => void;
  removeProject: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof Project) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateProject(project.id, field, e.target.value);
  };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-teal-100 text-teal-600 shadow-sm">
              <FaProjectDiagram size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {project.title || "(Untitled Project)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2 truncate max-w-md">
                {project.tools ? (
                  <span className="flex items-center gap-1">
                    <FaTools className="text-gray-400" size={10} />
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
              <FaTrash size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-teal-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-teal-600 text-white shadow-sm">
            <FaProjectDiagram size={16} />
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
            <FaTrash size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">

        {/* Title & Tools Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor={`title-${project.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Project Title
            </label>
            <input
              id={`title-${project.id}`}
              type="text"
              value={project.title}
              onChange={handleFieldChange('title')}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 bg-white"
              placeholder="e.g., E-Commerce Platform"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor={`tools-${project.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Technologies Used
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaTools size={12} />
              </div>
              <input
                id={`tools-${project.id}`}
                type="text"
                value={project.tools}
                onChange={handleFieldChange('tools')}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 bg-white"
                placeholder="React, Node.js, AWS..."
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor={`description-${project.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              <FaAlignLeft size={12} />
            </div>
            <textarea
              id={`description-${project.id}`}
              value={project.description}
              onChange={handleFieldChange('description')}
              className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-400 min-h-[100px] bg-white"
              placeholder="Describe the problem you solved and the impact of this project..."
            />
          </div>
        </div>

        {/* Links Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor={`projectLink-${project.id}`} className="block text-xs font-semibold text-gray-500  uppercase tracking-wider mb-1.5">
              Live Link
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaLink size={12} />
              </div>
              <input
                id={`projectLink-${project.id}`}
                type="url"
                value={project.projectLink || ''}
                onChange={handleFieldChange('projectLink')}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-300 text-sm bg-white"
                placeholder="https://my-app.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`repoLink-${project.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Repository
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaGithub size={14} />
              </div>
              <input
                id={`repoLink-${project.id}`}
                type="url"
                value={project.repoLink || ''}
                onChange={handleFieldChange('repoLink')}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-gray-300 text-sm bg-white"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
