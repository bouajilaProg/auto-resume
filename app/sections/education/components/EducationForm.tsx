"use client"

import { DEGREES, EducationItem } from "@/types/resumeTypes"
import { useState } from "react";
import {
  GraduationCap,
  Trash2,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Brain,
  BookOpen,
} from "lucide-react";

interface EducationFormProps {
  edu: EducationItem;
  index: number;
  updateEducation: <K extends keyof EducationItem>(id: number, field: K, value: EducationItem[K]) => void;
  removeEducation: (id: number) => void;
  errors?: Record<string, string>;
}

function EducationForm({ edu, index, updateEducation, removeEducation, errors }: EducationFormProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof EducationItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let value: string | string[] = e.target.value;
    if (field === "notes") {
      value = e.target.value.split("\n");
    }
    updateEducation(edu.id, field, value as EducationItem[typeof field]);
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
            <GraduationCap size={20} />
          </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {edu.degreeName || "(No Degree Specified)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-gray-700">{edu.institution || "Institution"}</span>
                {edu.startDate && (
                  <>
                    <span>•</span>
                    <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeEducation(edu.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ChevronDown size={16} />
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
            <GraduationCap size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Education #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeEducation(edu.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete education"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Degree Type */}
        <div className="col-span-1">
          <label htmlFor={`degreeType-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Degree Type
          </label>
          <div className="relative">
            <select
              id={`degreeType-${edu.id}`}
              value={edu.degreeType}
              onChange={handleFieldChange('degreeType')}
              className={`w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none text-gray-700 ${errors?.degreeType ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
            >
              {Object.entries(DEGREES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <ChevronDown size={12} />
            </div>
          </div>
          {errors?.degreeType && <p className="text-xs text-red-500 mt-1">{errors.degreeType}</p>}
        </div>

        {/* Degree Name */}
        <div className="col-span-1">
          <label htmlFor={`degreeName-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Degree / Major Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <BookOpen size={16} />
            </div>
            <input
              id={`degreeName-${edu.id}`}
              type="text"
              value={edu.degreeName}
              onChange={handleFieldChange('degreeName')}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.degreeName ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. Computer Science"
            />
          </div>
          {errors?.degreeName && <p className="text-xs text-red-500 mt-1">{errors.degreeName}</p>}
        </div>

        {/* Institution */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor={`institution-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Institution
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Building2 size={16} />
            </div>
            <input
              id={`institution-${edu.id}`}
              type="text"
              value={edu.institution}
              onChange={handleFieldChange('institution')}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 ${errors?.institution ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. Stanford University"
            />
          </div>
          {errors?.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor={`startDate-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Start Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Calendar size={16} />
            </div>
            <input
              id={`startDate-${edu.id}`}
              type="month"
              value={edu.startDate}
              onChange={handleFieldChange('startDate')}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-700 ${errors?.startDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
            />
          </div>
          {errors?.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div>
          <label htmlFor={`endDate-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            End Date <span className="normal-case font-normal text-gray-400 ml-1">(or expected)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Calendar size={16} />
            </div>
            <input
              id={`endDate-${edu.id}`}
              type="month"
              value={edu.endDate}
              onChange={handleFieldChange('endDate')}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-700 ${errors?.endDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
            />
          </div>
          {errors?.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
        </div>

        {/* Notes */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor={`notes-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Additional Information / Achievements
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
              <Brain size={16} />
            </div>
            <textarea
              id={`notes-${edu.id}`}
              value={edu.notes.join("\n")}
              onChange={handleFieldChange('notes')}
              rows={3}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 ${errors?.notes ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. GPA: 3.8/4.0, Specialized in Distributed Systems..."
            />
          </div>
          {errors?.notes && <p className="text-xs text-red-500 mt-1">{errors.notes}</p>}
        </div>

        {/* Key Skills */}
        <div className="col-span-1 md:col-span-2">
          <label htmlFor={`keySkills-${edu.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Key Skills / Core Modules
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
              <Brain size={16} />
            </div>
            <textarea
              id={`keySkills-${edu.id}`}
              value={edu.keySkills}
              onChange={handleFieldChange('keySkills')}
              rows={3}
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none ${errors?.keySkills ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g. Data Structures, Algorithms, Neural Networks, Research Methodology..."
            />
          </div>
          {errors?.keySkills && <p className="text-xs text-red-500 mt-1">{errors.keySkills}</p>}
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
