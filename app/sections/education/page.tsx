"use client"
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaGraduationCap } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Education {
  id: number;
  degreeType: string;
  degreeName: string;
  institution: string;
  startDate: string;
  endDate: string;
}

interface DegreeType {
  value: string;
  label: string;
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);

  const degreeTypes: DegreeType[] = [
    { value: "bachelor", label: "Bachelor's Degree (BS/BA)" },
    { value: "master", label: "Master's Degree (MS/MA)" },
    { value: "phd", label: "PhD/Doctorate" },
  ];

  const addEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, {
      id: newId,
      degreeType: "bachelor",
      degreeName: "",
      institution: "",
      startDate: "",
      endDate: ""
    }]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducations(educations.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const handleSave = () => {
    console.log("Saved Education Data:", educations);
    alert("Changes saved! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Education</h1>
            <p className="text-gray-600">Add your educational background and qualifications</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Education Entries
              </label>
              <button
                onClick={addEducation}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Education
              </button>
            </div>

            {educations.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FaGraduationCap className="mx-auto text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 mb-4">No education entries added yet</p>
                <button
                  onClick={addEducation}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Your First Entry
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div key={edu.id} className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <FaGraduationCap className="text-blue-600" />
                        Education #{index + 1}
                      </h3>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Degree Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Type
                      </label>
                      <select
                        value={edu.degreeType}
                        onChange={(e) => updateEducation(edu.id, 'degreeType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      >
                        {degreeTypes.map(dt => (
                          <option key={dt.value} value={dt.value}>
                            {dt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Degree Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Name
                      </label>
                      <input
                        type="text"
                        value={edu.degreeName}
                        onChange={(e) => updateEducation(edu.id, 'degreeName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., Computer Science, Business Administration"
                      />
                    </div>

                    {/* Institution */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="e.g., University of Tunisia"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Leave empty if currently enrolled
                        </p>
                      </div>
                    </div>
                  </div>
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
