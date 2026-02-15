import { WorkExperience } from "@/types/resumeTypes";
import { useState } from "react";
import { ChevronDown, ChevronUp, Briefcase, Trash, Building, MapPin, Calendar, AlignLeft, Tag, FileText } from "lucide-react";

export default function ExperienceForm({ experience, index, updateExperience, removeExperience, errors }: {
  experience: WorkExperience;
  index: number;
  updateExperience: <K extends keyof WorkExperience>(id: number, field: K, value: WorkExperience[K]) => void;
  removeExperience: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof WorkExperience) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value: string | string[] = e.target.value;
    if (field === "highlights") {
      value = e.target.value.split("\n");
    }
    updateExperience(experience.id, field, value as WorkExperience[typeof field]);
  };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-indigo-600 text-white shadow-sm">
              <Briefcase size={20} />
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
              <Trash size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-indigo-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-sm">
            <Briefcase size={16} />
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
            <Trash size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">
        {/* Job Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor={`jobTitle-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Job Title
            </label>
          <input
            id={`jobTitle-${experience.id}`}
            type="text"
            value={experience.jobTitle}
            onChange={handleFieldChange('jobTitle')}
            className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.jobTitle ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
            placeholder="e.g. Senior Frontend Developer"
          />
          {errors?.jobTitle && <p className="text-xs text-red-500 mt-1">{errors.jobTitle}</p>}
        </div>

        <div className="col-span-1">
          <label htmlFor={`company-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Building size={12} />
            </div>
            <input
              id={`company-${experience.id}`}
              type="text"
              value={experience.company}
              onChange={handleFieldChange('company')}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.company ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. Google"
            />
          </div>
          {errors?.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>
      </div>

      {/* Location & Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <label htmlFor={`location-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <MapPin size={12} />
            </div>
            <input
              id={`location-${experience.id}`}
              type="text"
              value={experience.location}
              onChange={handleFieldChange('location')}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.location ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. New York, NY"
            />
          </div>
          {errors?.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
        </div>

        <div className="col-span-1">
          <label htmlFor={`startDate-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Start Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Calendar size={12} />
            </div>
            <input
              id={`startDate-${experience.id}`}
              type="month"
              value={experience.startDate}
              onChange={handleFieldChange('startDate')}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-700 ${errors?.startDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
            />
          </div>
          {errors?.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
        </div>

        <div className="col-span-1">
          <label htmlFor={`endDate-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            End Date <span className="normal-case font-normal text-gray-400 ml-1">(empty if current)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Calendar size={12} />
            </div>
            <input
              id={`endDate-${experience.id}`}
              type="month"
              value={experience.endDate}
              onChange={handleFieldChange('endDate')}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-700 ${errors?.endDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
            />
          </div>
          {errors?.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
        </div>
      </div>

      {/* Summary */}
      <div>
        <label htmlFor={`summary-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Summary
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
            <FileText size={12} />
          </div>
          <textarea
            id={`summary-${experience.id}`}
            value={experience.summary || ""}
            onChange={handleFieldChange('summary')}
            className={`w-full pl-9 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 min-h-[80px] resize-none ${errors?.summary ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
            placeholder="Brief summary of your role and responsibilities..."
          />
        </div>
        {errors?.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
      </div>

      {/* Highlights */}
      <div>
        <label htmlFor={`highlights-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Role Description / Achievements
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
            <AlignLeft size={12} />
          </div>
          <textarea
            id={`highlights-${experience.id}`}
            value={experience.highlights.join("\n")}
            onChange={handleFieldChange('highlights')}
            className={`w-full pl-9 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 min-h-[120px] ${errors?.highlights ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
            placeholder="• Led a team of 5 developers...&#10;• Increased performance by 20%..."
          />
        </div>
        {errors?.highlights && <p className="text-xs text-red-500 mt-1">{errors.highlights}</p>}
      </div>

        {/* Keywords */}
        <div>
          <label htmlFor={`keywords-${experience.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Skills / Technologies Used
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Tag size={12} />
            </div>
            <input
              id={`keywords-${experience.id}`}
              type="text"
              value={experience.keywords}
              onChange={handleFieldChange('keywords')}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.keywords ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="React, TypeScript, Agile..."
            />
          </div>
          {errors?.keywords && <p className="text-xs text-red-500 mt-1">{errors.keywords}</p>}
        </div>
      </div>
    </div>
  );
}
