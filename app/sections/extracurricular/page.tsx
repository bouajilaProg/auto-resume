"use client";

import { FaPlus, FaTrophy } from "react-icons/fa";
import Link from "next/link";
import ExtraCurricularForm from "./components/ExtraCurricularForm";
import { useExtraCurricular } from "@/hooks/useExtracurricular";

export default function ExtraCurricularActivitiesPage() {
  const {
    activities,
    addActivity,
    removeActivity,
    updateActivity,
    handleSave,
  } = useExtraCurricular();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Extracurricular Activities
            </h1>
            <p className="text-gray-600">
              Highlight your involvement in clubs, organizations, and activities
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Activity Entries
              </label>
              <button
                onClick={addActivity}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Activity
              </button>
            </div>

            {activities.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FaTrophy className="mx-auto text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 mb-4">No activities added yet</p>
                <button
                  onClick={addActivity}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Your First Activity
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <ExtraCurricularForm
                    key={activity.id}
                    activity={activity}
                    index={index}
                    updateActivity={updateActivity}
                    removeActivity={removeActivity}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <Link
                href="/sections"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
