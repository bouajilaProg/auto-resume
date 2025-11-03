import { SkillItem, skillType } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash, FaPlus } from "react-icons/fa";

export default function SkillSection({
  title,
  icon,
  skills,
  onAdd,
  onRemove,
  onUpdate
}: {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  onAdd: (name: string) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [newSkillName, setNewSkillName] = useState("");

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

  if (!isOpen) {
    return (
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {icon}
              {title}
              <span className="text-sm font-normal text-gray-500">({skills.length})</span>
            </h3>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Expand section"
            >
              <FaChevronDown />
            </button>
          </div>
          {skills.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-700">
                {skills.map(s => s.name).filter(name => name.trim()).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {icon}
            {title}
            <span className="text-sm font-normal text-gray-500">({skills.length})</span>
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse section"
          >
            <FaChevronUp />
          </button>
        </div>

        <div className="space-y-4">
          {/* Add new skill */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              placeholder={`Add new ${title.toLowerCase().slice(0, -1)}`}
            />
            <button
              onClick={handleAdd}
              disabled={!newSkillName.trim()}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${newSkillName.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              <FaPlus size={12} />
              Add
            </button>
          </div>

          {/* Skills list */}
          {skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No {title.toLowerCase()} added yet
            </div>
          ) : (
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                >
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => onUpdate(skill.id, e.target.value)}
                    onBlur={() => handleBlur(skill)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 font-medium"
                  />
                  <button
                    onClick={() => onRemove(skill.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                    aria-label="Delete skill"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
