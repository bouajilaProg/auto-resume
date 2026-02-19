"use client";

import { ExtraCurricularActivity } from "@/types/resumeTypes";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, Trash2, Tag, Calendar } from "lucide-react";

function ExtraCurricularForm({
  activity,
  index,
  updateActivity,
  removeActivity,
  errors,
}: {
  activity: ExtraCurricularActivity;
  index: number;
  updateActivity: <K extends keyof ExtraCurricularActivity>(id: number, field: K, value: ExtraCurricularActivity[K]) => void;
  removeActivity: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof ExtraCurricularActivity) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateActivity(activity.id, field, e.target.value);
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
              <Trophy size={20} />
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
              <Trash2 size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Expand activity entry"
            >
              <ChevronDown />
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
            <Trophy size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">Activity #{index + 1}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeActivity(activity.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
            aria-label="Delete activity entry"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Collapse activity entry"
          >
            <ChevronUp />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label
            htmlFor={`activityName-${activity.id}`}
            className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
          >
            Activity Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Tag size={12} />
            </div>
            <input
              id={`activityName-${activity.id}`}
              type="text"
              value={activity.activityName}
              onChange={handleFieldChange("activityName")}
              className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 ${errors?.activityName ? "border-red-500 bg-red-50/10" : "border-gray-200"
                }`}
              placeholder="e.g., Student Government President, Varsity Basketball"
            />
          </div>
          {errors?.activityName && <p className="text-xs text-red-500 mt-1">{errors.activityName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label
              htmlFor={`startDate-${activity.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Calendar size={12} />
              </div>
              <input
                id={`startDate-${activity.id}`}
                type="month"
                value={activity.startDate}
                onChange={handleFieldChange("startDate")}
                className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-700 ${errors?.startDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
              />
            </div>
            {errors?.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
          </div>

          <div className="col-span-1">
            <label
              htmlFor={`endDate-${activity.id}`}
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              End Date <span className="normal-case font-normal text-gray-400 ml-1">(empty if current)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Calendar size={12} />
              </div>
              <input
                id={`endDate-${activity.id}`}
                type="month"
                value={activity.endDate || ""}
                onChange={handleFieldChange("endDate")}
                className={`w-full pl-9 pr-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-700 ${errors?.endDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
              />
            </div>
            {errors?.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ExtraCurricularForm);
