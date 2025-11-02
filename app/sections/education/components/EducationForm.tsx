import { DegreeType, EducationItem } from "@/types/resumeTypes"
import { FaGraduationCap, FaTrash } from "react-icons/fa"

function EducationForm({ edu, index, updateEducation, removeEducation }: {
  edu: EducationItem;
  index: number;
  updateEducation: (id: number, field: keyof EducationItem, value: string) => void;
  removeEducation: (id: number) => void;
}) {
  return (
    <div>
      <div className="border border-gray-200 rounded-lg p-6 space-y-4 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            Education #{index + 1}
          </h3>
          <button
            onClick={() => removeEducation(edu.id)}
            className="p-4 text-red-600 hover:bg-red-50 rounded-lg transition"
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
            {Object.keys(DegreeType).map(dt => (
              <option key={dt} value={dt}>
                {DegreeType[dt as keyof typeof DegreeType]}
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


    </div>
  )
}

export default EducationForm
