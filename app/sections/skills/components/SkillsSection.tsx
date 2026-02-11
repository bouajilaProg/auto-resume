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
  skills: SkillItem[];
  onAdd: (name: string) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  colorTheme: "blue" | "emerald" | "purple";
}

const themeClasses = {
  blue: {
    badge:
      "bg-blue-50 text-blue-700 border-blue-100 hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200",
    icon: "bg-blue-600",
  },
  emerald: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500",
    button: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-200",
    icon: "bg-emerald-600",
  },
  purple: {
    badge:
      "bg-purple-50 text-purple-700 border-purple-100 hover:border-purple-300 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500",
    button: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-200",
    icon: "bg-purple-600",
  },
};

export default function SkillSection({
  title,
  description,
  icon,
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 transition-all hover:shadow-md overflow-hidden group">
        <div
          onClick={() => setIsOpen(true)}
          className="p-5 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${theme.icon} text-white shadow-sm group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h3>
              <p className="text-sm text-gray-400 truncate max-w-md">
                {skills.length
                  ? skills.map(s => s.name).join(" • ")
                  : "No skills added yet"}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronDown className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  /* Expanded */
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ring-1 ring-gray-50">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <div className="flex gap-4 items-center">
          <div className={`p-3 rounded-xl ${theme.icon} text-white shadow-md`}>
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg tracking-tight flex items-center gap-2">
              {title}
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                {skills.length}
              </span>
            </h3>
            {description && (
              <p className="text-sm text-gray-500 font-medium">{description}</p>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronUp className="text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Add Input */}
        <div className="relative group">
          <input
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder={`Add a new ${title.toLowerCase().split(' ').pop()}...`}
            className="w-full pl-5 pr-32 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium"
          />
          <button
            onClick={handleAdd}
            disabled={!newSkillName.trim()}
            className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl flex items-center gap-2 text-white font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${theme.button} shadow-sm`}
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Chips Grid */}
        <div className="flex flex-wrap gap-3">
          {skills.length === 0 ? (
            <div className="w-full py-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm font-medium italic">Empty. Add your first skill above!</p>
            </div>
          ) : (
            skills.map(skill => (
              <div
                key={skill.id}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${theme.badge}`}
              >
                <input
                  value={skill.name}
                  onChange={e => onUpdate(skill.id, e.target.value)}
                  onBlur={() => handleBlur(skill)}
                  className="bg-transparent text-sm font-bold outline-none min-w-[60px] max-w-[200px]"
                  style={{ width: `${Math.max(skill.name.length, 6)}ch` }}
                />
                <button 
                  onClick={() => onRemove(skill.id)}
                  className="hover:text-red-500 transition-colors p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
