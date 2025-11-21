import { ExtraCurricularActivity } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrophy, FaTrash } from "react-icons/fa";

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

  if (!isOpen) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaTrophy className="text-blue-600" />
            Activity #{index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeActivity(activity.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete activity entry"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Expand activity entry"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
        {/* details part */}
        <div>
          <p className="text-gray-700"><span className="font-semibold">Activity:</span> {activity.activityName}</p>
          <p className="text-gray-700"><span className="font-semibold">Start Date:</span> {activity.startDate}</p>
          {activity.endDate && <p className="text-gray-700"><span className="font-semibold">End Date:</span> {activity.endDate}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaTrophy className="text-blue-600" />
          Activity #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeActivity(activity.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete activity entry"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse activity entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Activity Name */}
      <div>
        <label htmlFor={`activityName-${activity.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Activity Name
        </label>
        <input
          id={`activityName-${activity.id}`}
          type="text"
          value={activity.activityName}
          onChange={handleFieldChange('activityName')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., Student Government President"
        />
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor={`startDate-${activity.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <input
          id={`startDate-${activity.id}`}
          type="month"
          value={activity.startDate}
          onChange={handleFieldChange('startDate')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor={`endDate-${activity.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          End Date <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <input
          id={`endDate-${activity.id}`}
          type="month"
          value={activity.endDate || ""}
          onChange={handleFieldChange('endDate')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
