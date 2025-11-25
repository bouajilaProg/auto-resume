import { WorkExperience } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBriefcase, FaTrash, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaAlignLeft, FaTags } from "react-icons/fa";

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

  // 1. Minimized View (Summary)
  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* COLOR CHANGE: orange-100 -> blue-100, orange-600 -> blue-600 */}
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 shadow-sm">
              <FaBriefcase size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {experience.jobTitle || "(No Job Title)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-gray-700">{experience.company || "Company Name"}</span>
                {experience.startDate && (
                  <>
                    <span>•</span>
                    <span>{experience.startDate} - {experience.endDate || "Present"}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeExperience(experience.id)}
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
  };

  // 2. Expanded View (Edit Mode)
  return (
    < div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-blue-50" >
      {/* Header */}
      < div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl" >
        <div className="flex items-center gap-3">
          {/* COLOR CHANGE: bg-orange-600 -> bg-blue-600 */}
          <div className="p-2.5 rounded-lg bg-blue-600 text-white shadow-sm">
            <FaBriefcase size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Experience #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeExperience(experience.id)}
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
      </div >

      {/* Form Fields */}
      < div className="p-6 space-y-6" >

        {/* Job Title & Company */}
        < div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          <div className="col-span-1">
            <label htmlFor={`jobTitle-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Job Title
            </label>
            <input
              id={`jobTitle-${experience.id}`}
              type="text"
              value={experience.jobTitle}
              onChange={handleFieldChange('jobTitle')}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor={`company-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaBuilding size={12} />
              </div>
              <input
                id={`company-${experience.id}`}
                type="text"
                value={experience.company}
                onChange={handleFieldChange('company')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="e.g. Google"
              />
            </div>
          </div>
        </div >

        {/* Location & Dates */}
        < div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
          <div className="col-span-1">
            <label htmlFor={`location-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaMapMarkerAlt size={12} />
              </div>
              <input
                id={`location-${experience.id}`}
                type="text"
                value={experience.location}
                onChange={handleFieldChange('location')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="e.g. New York, NY"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor={`startDate-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaCalendarAlt size={12} />
              </div>
              <input
                id={`startDate-${experience.id}`}
                type="month"
                value={experience.startDate}
                onChange={handleFieldChange('startDate')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor={`endDate-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              End Date <span className="normal-case font-normal text-gray-400 ml-1">(empty if current)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaCalendarAlt size={12} />
              </div>
              <input
                id={`endDate-${experience.id}`}
                type="month"
                value={experience.endDate}
                onChange={handleFieldChange('endDate')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>
        </div >

        {/* Summary */}
        < div >
          <label htmlFor={`summary-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Role Description / Achievements
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
              <FaAlignLeft size={12} />
            </div>
            <textarea
              id={`summary-${experience.id}`}
              value={experience.summary}
              onChange={handleFieldChange('summary')}
              className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 min-h-[120px]"
              placeholder="• Led a team of 5 developers...&#10;• Increased performance by 20%..."
            />
          </div>
        </div >

        {/* Keywords */}
        < div >
          <label htmlFor={`keywords-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Skills / Technologies Used
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaTags size={12} />
            </div>
            <input
              id={`keywords-${experience.id}`}
              type="text"
              value={experience.keywords}
              onChange={handleFieldChange('keywords')}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="React, TypeScript, Agile..."
            />
          </div>
        </div >

      </div >
    </div >
  );
}
