"use client"
import { mockResumeData } from '@/db/mock-data';
import { useState } from 'react';
import { FaPlus, FaProjectDiagram } from 'react-icons/fa';

import ProjectForm from './components/ProjectForm';
import { Project } from '@/types/resumeTypes';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockResumeData.projects);

  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, {
      id: newId,
      title: "",
      description: "",
      tools: "",
      projectLink: "",
      repoLink: ""
    }]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setProjects(projects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSave = () => {
    console.log("Saved Projects Data:", projects);
    alert("Changes saved! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects</h1>
            <p className="text-gray-600">Showcase your personal and professional projects</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Entries
              </label>
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FaProjectDiagram className="mx-auto text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 mb-4">No projects added yet</p>
                <button
                  onClick={addProject}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Your First Project
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <ProjectForm
                    key={project.id}
                    project={project}
                    index={index}
                    updateProject={updateProject}
                    removeProject={removeProject}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <Link
                href="/sections"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
