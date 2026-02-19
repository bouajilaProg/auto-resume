import { Language, PROFICIENCY_LEVELS } from "@/types/resumeTypes";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Languages as LanguagesIcon,
  Trash2,
  Globe,
  Award,
} from "lucide-react";

function LanguageForm({
  language,
  index,
  updateLanguage,
  removeLanguage,
  errors,
}: {
  language: Language;
  index: number;
  updateLanguage: <K extends keyof Language>(
    id: number,
    field: K,
    value: Language[K]
  ) => void;
  removeLanguage: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Fix: Ensure proficiency is valid on mount/change
  React.useEffect(() => {
    if (!language.proficiency || !(PROFICIENCY_LEVELS as readonly string[]).includes(language.proficiency)) {
      updateLanguage(language.id, "proficiency", "Intermediate");
    }
  }, [language.id, language.proficiency, updateLanguage]);

  const handleFieldChange =
    <K extends keyof Language>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      updateLanguage(language.id, field, e.target.value as Language[K]);
    };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-primary-600 text-white shadow-sm">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {language.name || "(No Language Name)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                  {language.proficiency || "Proficiency"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeLanguage(language.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-primary-50">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary-600 text-white shadow-sm">
            <LanguagesIcon size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Language #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeLanguage(language.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">
              Language
            </label>
            <div className="relative">
              <Globe
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={language.name}
                onChange={handleFieldChange("name")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.name ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="e.g. English, French, Japanese"
              />
            </div>
            {errors?.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">
              Proficiency Level
            </label>
            <div className="relative">
              <Award
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={language.proficiency}
                onChange={handleFieldChange("proficiency")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all bg-white appearance-none ${errors?.proficiency ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
              >
                {PROFICIENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            {errors?.proficiency && <p className="text-xs text-red-500 mt-1">{errors.proficiency}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LanguageForm);
