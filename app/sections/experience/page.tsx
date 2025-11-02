"use client"
import { mockResumeData } from '@/db/mock-data';
import { useState } from 'react';
import { FaPlus, FaBriefcase } from 'react-icons/fa';
import ExperienceForm from './components/ExperienceForm';
import { WorkExperience } from '@/types/resumeTypes';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>(mockResumeData.experiences);

  const addExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences([...experiences, {
      id: newId,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      summary: "",
      keywords: ""
    }]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const updateExperience = (id: number, field: keyof WorkExperience, value: string) => {
    setExperiences(experiences.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const handleSave = () => {
    console.log("Saved Experience Data:", experiences);
    alert("Changes saved! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Experience</h1>
            <p className="text-gray-600">Showcase your professional work history and achievements</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Experience Entries
              </label>
              <button
                onClick={addExperience}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Experience
              </button>
            </div>

            {experiences.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FaBriefcase className="mx-auto text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 mb-4">No work experience added yet</p>
                <button
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Your First Experience
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <ExperienceForm
                    key={experience.id}
                    experience={experience}
                    index={index}
                    updateExperience={updateExperience}
                    removeExperience={removeExperience}
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
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
