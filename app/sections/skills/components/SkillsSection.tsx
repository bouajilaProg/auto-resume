import { SkillItem } from "@/types/resumeTypes";
import { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp, FaTimes, FaPlus } from "react-icons/fa";

interface SkillSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  iconBg: string; // e.g., "bg-blue-500"
  skills: SkillItem[];
  onAdd: (name: string) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  colorTheme: "blue" | "emerald" | "purple"; // Strict typing for theme
}

// Helper for dynamic classes based on theme
const themeClasses = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-100 hover:border-blue-300 focus-within:border-blue-400 focus-within:ring-blue-100",
    button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200",
    lightText: "text-blue-600"
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 focus-within:border-emerald-400 focus-within:ring-emerald-100",
    button: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-200",
    lightText: "text-emerald-600"
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300 focus-within:border-purple-400 focus-within:ring-purple-100",
    button: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-200",
    lightText: "text-purple-600"
  }
};

export default function SkillSection({
  title,
  description,
  icon,
  iconBg,
  skills,
  onAdd,
  onRemove,
  onUpdate,
  colorTheme
}: SkillSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [newSkillName, setNewSkillName] = useState("");
  const theme = themeClasses[colorTheme];

  const handleAdd = () => {
    if (newSkillName.trim()) {
      onAdd(newSkillName.trim());
      setNewSkillName("");
    }
  };

  const handleBlur = (skill: SkillItem) => {
    if (skill.name.trim() === "") {
      onRemove(skill.id);
    }
  };

  // Render the minimized view (Just a summary)
  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div
          className="p-5 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${iconBg} shadow-sm`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
              {skills.length > 0 ? (
                <p className="text-sm text-gray-500 mt-1 truncate max-w-md">
                  {skills.map(s => s.name).join(" • ")}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-1">No skills added yet</p>
              )}
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
            <FaChevronDown />
          </button>
        </div>
      </div>
    );
  }

  // Render the Expanded View
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all">
      {/* Section Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${iconBg} text-white shadow-sm`}>
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {title}
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                {skills.length}
              </span>
            </h3>
            {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
        >
          <FaChevronUp />
        </button>
      </div>

      <div className="p-6 space-y-6">

        {/* Add New Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-offset-0 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            placeholder={`+ Type a skill and press Enter...`}
          />
          <button
            onClick={handleAdd}
            disabled={!newSkillName.trim()}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 shadow-sm ${newSkillName.trim()
              ? `${theme.button} text-white shadow-md transform hover:-translate-y-0.5`
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            <FaPlus size={12} />
            Add
          </button>
        </div>

        {/* Skills Cloud / Chips */}
        <div className="flex flex-wrap gap-3">
          {skills.length === 0 && (
            <div className="w-full py-8 text-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-sm">
              No skills in this section yet. Add one above!
            </div>
          )}

          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`group relative flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full border transition-all duration-200 ${theme.badge}`}
            >
              <input
                type="text"
                value={skill.name}
                onChange={(e) => onUpdate(skill.id, e.target.value)}
                onBlur={() => handleBlur(skill)}
                className="bg-transparent border-none p-0 text-sm font-medium focus:ring-0 cursor-text min-w-[2rem] max-w-[200px] outline-none text-inherit"
                size={Math.max(skill.name.length, 3)}
              />

              <button
                onClick={() => onRemove(skill.id)}
                className="p-1.5 rounded-full hover:bg-black/5 text-current opacity-60 hover:opacity-100 transition-all"
                title="Remove skill"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
