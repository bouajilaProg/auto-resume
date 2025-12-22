import { SkillItem } from "@/types/resumeTypes";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  X,
  Plus
} from "lucide-react";

interface SkillSectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  iconBg: string;
  skills: SkillItem[];
  onAdd: (name: string) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  colorTheme: "blue" | "emerald" | "purple";
}

const themeClasses = {
  blue: {
    badge:
      "bg-blue-50 text-blue-700 border-blue-100 hover:border-blue-300 focus-within:border-blue-400 focus-within:ring-blue-100",
    button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200",
  },
  emerald: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 focus-within:border-emerald-400 focus-within:ring-emerald-100",
    button: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-200",
  },
  purple: {
    badge:
      "bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300 focus-within:border-purple-400 focus-within:ring-purple-100",
    button: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-200",
  },
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
  colorTheme,
}: SkillSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [newSkillName, setNewSkillName] = useState("");
  const theme = themeClasses[colorTheme];

  const handleAdd = () => {
    if (!newSkillName.trim()) return;
    onAdd(newSkillName.trim());
    setNewSkillName("");
  };

  const handleBlur = (skill: SkillItem) => {
    if (!skill.name.trim()) {
      onRemove(skill.id);
    }
  };

  /* Collapsed */
  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md">
        <div
          onClick={() => setIsOpen(true)}
          className="p-5 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${iconBg} text-white`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 truncate max-w-md">
                {skills.length
                  ? skills.map(s => s.name).join(" • ")
                  : "No skills added yet"}
              </p>
            </div>
          </div>
          <ChevronDown className="text-gray-400" />
        </div>
      </div>
    );
  }

  /* Expanded */
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-5 border-b flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-lg ${iconBg} text-white`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 flex gap-2">
              {title}
              <span className="text-xs bg-gray-100 px-2 rounded-full">
                {skills.length}
              </span>
            </h3>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        </div>
        <button onClick={() => setIsOpen(false)}>
          <ChevronUp className="text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Add */}
        <div className="flex gap-3">
          <input
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Type a skill and press Enter..."
            className="flex-1 px-4 py-2.5 border rounded-lg"
          />
          <button
            onClick={handleAdd}
            disabled={!newSkillName.trim()}
            className={`px-5 rounded-lg flex items-center gap-2 text-white ${theme.button}`}
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <div
              key={skill.id}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border ${theme.badge}`}
            >
              <input
                value={skill.name}
                onChange={e => onUpdate(skill.id, e.target.value)}
                onBlur={() => handleBlur(skill)}
                className="bg-transparent text-sm outline-none"
              />
              <button onClick={() => onRemove(skill.id)}>
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
