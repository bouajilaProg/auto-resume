import { Hobby } from "@/types/resumeTypes";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Trash2,
  Tag,
  AlignLeft,
} from "lucide-react";

export default function HobbyForm({
  hobby,
  index,
  updateHobby,
  removeHobby,
  errors,
}: {
  hobby: Hobby;
  index: number;
  updateHobby: <K extends keyof Hobby>(
    id: number,
    field: K,
    value: Hobby[K]
  ) => void;
  removeHobby: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange =
    <K extends keyof Hobby>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateHobby(hobby.id, field, e.target.value as Hobby[K]);
    };

  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-pink-100 text-pink-600 shadow-sm">
              <Heart size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {hobby.name || "(No Hobby Name)"}
              </h3>
              {hobby.description && (
                <p className="text-sm text-gray-500 line-clamp-1">
                  {hobby.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeHobby(hobby.id)}
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-pink-50">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-pink-600 text-white shadow-sm">
            <Heart size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Hobby #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeHobby(hobby.id)}
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
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">
              Hobby Name
            </label>
            <div className="relative">
              <Tag
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={hobby.name}
                onChange={handleFieldChange("name")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.name ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="e.g. Photography, Chess, Hiking"
              />
            </div>
            {errors?.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">
              Description (Optional)
            </label>
            <div className="relative">
              <AlignLeft
                size={14}
                className="absolute left-3 top-3 text-gray-400"
              />
              <textarea
                value={hobby.description || ""}
                onChange={handleFieldChange("description")}
                rows={3}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all placeholder:text-gray-400 bg-white resize-none ${errors?.description ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
                placeholder="Briefly describe your interest or achievements in this hobby..."
              />
            </div>
            {errors?.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
