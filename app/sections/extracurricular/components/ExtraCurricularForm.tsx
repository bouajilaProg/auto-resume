import { ExtraCurricularActivity } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrophy, FaTrash, FaTags, FaCalendarAlt } from "react-icons/fa";

export default function ExtraCurricularForm({ activity, index, updateActivity, removeActivity }: {
  activity: ExtraCurricularActivity;
  index: number;
  updateActivity: (id: number, field: keyof ExtraCurricularActivity, value: string) => void;
  removeActivity: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof ExtraCurricularActivity) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateActivity(activity.id, field, e.target.value);
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
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 shadow-sm">
              <FaTrophy size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {activity.activityName || "(No Activity Name)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                {activity.startDate && (
                  <>
                    <span className="font-medium text-gray-700">{activity.startDate}</span>
                    <span>-</span>
                    <span>{activity.endDate || "Present"}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeActivity(activity.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete activity entry"
            >
              <FaTrash size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Expand activity entry"
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-blue-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600 text-white shadow-sm">
            <FaTrophy size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Activity #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeActivity(activity.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
            aria-label="Delete activity entry"
          >
            <FaTrash size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Collapse activity entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">

        {/* Activity Name */}
        <div>
          <label htmlFor={`activityName-${activity.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Activity Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <FaTags size={12} />
            </div>
            <input
              id={`activityName-${activity.id}`}
              type="text"
              value={activity.activityName}
              onChange={handleFieldChange('activityName')}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="e.g., Student Government President, Varsity Basketball"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor={`startDate-${activity.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaCalendarAlt size={12} />
              </div>
              <input
                id={`startDate-${activity.id}`}
                type="month"
                value={activity.startDate}
                onChange={handleFieldChange('startDate')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor={`endDate-${activity.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              End Date <span className="normal-case font-normal text-gray-400 ml-1">(empty if current)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaCalendarAlt size={12} />
              </div>
              <input
                id={`endDate-${activity.id}`}
                type="month"
                value={activity.endDate || ""}
                onChange={handleFieldChange('endDate')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
