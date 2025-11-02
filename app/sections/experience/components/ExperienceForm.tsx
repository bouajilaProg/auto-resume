import { WorkExperience } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBriefcase, FaTrash } from "react-icons/fa";

export default function ExperienceForm({ experience, index, updateExperience, removeExperience }: {
  experience: WorkExperience;
  index: number;
  updateExperience: (id: number, field: keyof WorkExperience, value: string) => void;
  removeExperience: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof WorkExperience) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateExperience(experience.id, field, e.target.value);
  };

  if (!isOpen) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaBriefcase className="text-blue-600" />
            Experience #{index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeExperience(experience.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete experience entry"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Expand experience entry"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
        <div>
          <p className="text-gray-700"><span className="font-semibold">Job Title:</span> {experience.jobTitle}</p>
          <p className="text-gray-700"><span className="font-semibold">Company:</span> {experience.company}</p>
          <p className="text-gray-700"><span className="font-semibold">Location:</span> {experience.location}</p>
          <p className="text-gray-700">
            <span className="font-semibold">Duration:</span> {experience.startDate} - {experience.endDate}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaBriefcase className="text-blue-600" />
          Experience #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeExperience(experience.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete experience entry"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse experience entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label htmlFor={`jobTitle-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Job Title
        </label>
        <input
          id={`jobTitle-${experience.id}`}
          type="text"
          value={experience.jobTitle}
          onChange={handleFieldChange('jobTitle')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., Frontend Developer"
        />
      </div>

      {/* Company and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`company-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            id={`company-${experience.id}`}
            type="text"
            value={experience.company}
            onChange={handleFieldChange('company')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="e.g., Tech Solutions Ltd."
          />
        </div>
        <div>
          <label htmlFor={`location-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            id={`location-${experience.id}`}
            type="text"
            value={experience.location}
            onChange={handleFieldChange('location')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="e.g., Tunis, Tunisia"
          />
        </div>
      </div>

      {/* Start Date and End Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`startDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            id={`startDate-${experience.id}`}
            type="month"
            value={experience.startDate}
            onChange={handleFieldChange('startDate')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label htmlFor={`endDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            id={`endDate-${experience.id}`}
            type="month"
            value={experience.endDate}
            onChange={handleFieldChange('endDate')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="Leave empty if current"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty if this is your current position
          </p>
        </div>
      </div>

      {/* Summary */}
      <div>
        <label htmlFor={`summary-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          id={`summary-${experience.id}`}
          value={experience.summary}
          onChange={handleFieldChange('summary')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="Describe your responsibilities, achievements, and impact in this role"
          rows={4}
        />
      </div>

      {/* Keywords */}
      <div>
        <label htmlFor={`keywords-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Skills & Keywords
        </label>
        <input
          id={`keywords-${experience.id}`}
          type="text"
          value={experience.keywords}
          onChange={handleFieldChange('keywords')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., React JavaScript CSS HTML UI/UX"
        />
        <p className="text-xs text-gray-500 mt-1">
          Add relevant skills and technologies separated by spaces
        </p>
      </div>
    </div>
  );
}
