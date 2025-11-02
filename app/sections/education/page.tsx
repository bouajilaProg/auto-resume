"use client"
import { useState } from 'react';
import { FaPlus, FaGraduationCap } from 'react-icons/fa';
import EducationForm from './components/EducationForm';
import { DegreeType, EducationItem } from '@/types/resumeTypes';
import { mockResumeData } from '@/db/mock-data';


export default function EducationPage() {
  const [educations, setEducations] = useState<EducationItem[]>(mockResumeData.educations);


  const addEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, {
      id: newId,
      degreeType: DegreeType.BS,
      degreeName: "",
      institution: "",
      startDate: "",
      endDate: ""
    }]);
  };

  const removeEducation = (id: number) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  const updateEducation = (id: number, field: keyof EducationItem, value: string) => {
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
                  //function EducationForm({ edu, index, updateEducation, removeEducation }) {
                  <EducationForm key={index} edu={edu} index={index} updateEducation={updateEducation} removeEducation={removeEducation} />
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
