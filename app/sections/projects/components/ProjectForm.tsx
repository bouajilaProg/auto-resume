import { Project } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaProjectDiagram, FaTrash } from "react-icons/fa";

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
      <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaProjectDiagram className="text-blue-600" />
            Project #{index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeProject(project.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete project entry"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Expand project entry"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
        {/* details part */}
        <div>
          <p className="text-gray-700"><span className="font-semibold">Title:</span> {project.title}</p>
          <p className="text-gray-700"><span className="font-semibold">Tools:</span> {project.tools}</p>
          {project.projectLink && (
            <p className="text-gray-700"><span className="font-semibold">Project Link:</span> {project.projectLink}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaProjectDiagram className="text-blue-600" />
          Project #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeProject(project.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete project entry"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse project entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Project Title */}
      <div>
        <label htmlFor={`title-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Project Title
        </label>
        <input
          id={`title-${project.id}`}
          type="text"
          value={project.title}
          onChange={handleFieldChange('title')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., E-Commerce Platform"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor={`description-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id={`description-${project.id}`}
          value={project.description}
          onChange={handleFieldChange('description')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="Describe your project, what you built, and the impact it had"
          rows={4}
        />
      </div>

      {/* Tools */}
      <div>
        <label htmlFor={`tools-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Tools & Technologies
        </label>
        <input
          id={`tools-${project.id}`}
          type="text"
          value={project.tools}
          onChange={handleFieldChange('tools')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., React Node.js MongoDB AWS"
        />
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`projectLink-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Project Link
          </label>
          <input
            id={`projectLink-${project.id}`}
            type="url"
            value={project.projectLink || ''}
            onChange={handleFieldChange('projectLink')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="https://example.com"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: Live demo or deployment URL
          </p>
        </div>
        <div>
          <label htmlFor={`repoLink-${project.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Repository Link
          </label>
          <input
            id={`repoLink-${project.id}`}
            type="url"
            value={project.repoLink || ''}
            onChange={handleFieldChange('repoLink')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="https://github.com/..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: GitHub or GitLab repository
          </p>
        </div>
      </div>
    </div>
  );
}
