"use client"
import { DegreeType, EducationItem } from "@/types/resumeTypes"
import { useState } from "react";
import { FaGraduationCap, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa"

interface EducationFormProps {
  edu: EducationItem;
  index: number;
  updateEducation: (id: number, field: keyof EducationItem, value: string) => void;
  removeEducation: (id: number) => void;
}

function EducationForm({ edu, index, updateEducation, removeEducation }: EducationFormProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof EducationItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateEducation(edu.id, field, e.target.value);
  };

  if (!isOpen) {
    return (

      <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            Education #{index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeEducation(edu.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete education entry"
            >
              <FaTrash />
            </button>          <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Collapse education entry"
            >
              <FaChevronDown />
            </button>

          </div>
        </div>

        {/* details part */}
        <div>
          <p className="text-gray-700"><span className="font-semibold">Degree Name:</span> {edu.degreeName}</p>
          <p className="text-gray-700"><span className="font-semibold">Institution:</span> {edu.institution}</p>
          <p className="text-gray-700">
            <span className="font-semibold">Duration:</span> {edu.startDate} - {edu.endDate || "Present"}
          </p>
        </div>
      </div>


    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaGraduationCap className="text-blue-600" />
          Education #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeEducation(edu.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete education entry"
          >
            <FaTrash />
          </button>          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse education entry"
          >
            <FaChevronUp />
          </button>

        </div>
      </div>

      {/* Degree Type */}
      <div>
        <label htmlFor={`degreeType-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Degree Type
        </label>
        <select
          id={`degreeType-${edu.id}`}
          value={edu.degreeType}
          onChange={handleFieldChange('degreeType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
        >
          {Object.entries(DegreeType).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Degree Name */}
      <div>
        <label htmlFor={`degreeName-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Degree Name
        </label>
        <input
          id={`degreeName-${edu.id}`}
          type="text"
          value={edu.degreeName}
          onChange={handleFieldChange('degreeName')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., Computer Science, Business Administration"
        />
      </div>

      {/* Institution */}
      <div>
        <label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Institution Name
        </label>
        <input
          id={`institution-${edu.id}`}
          type="text"
          value={edu.institution}
          onChange={handleFieldChange('institution')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., University of Tunisia"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`startDate-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            id={`startDate-${edu.id}`}
            type="month"
            value={edu.startDate}
            onChange={handleFieldChange('startDate')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label htmlFor={`endDate-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            id={`endDate-${edu.id}`}
            type="month"
            value={edu.endDate}
            onChange={handleFieldChange('endDate')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty if currently enrolled
          </p>
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
