"use client";

import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./components/ContactForm";
import Link from "next/link";
import { usePersonalInfo } from "@/hooks/usePersonalInfo";
import Loading from "@/app/components/Loading";

export default function PersonalInfoPage() {
  const {
    personalInfo,
    updateName,
    updateLocation,
    updateDescription,
    updateContacts,
    updateHobbies,
    handleSave,
    loading
  } = usePersonalInfo();


  if (loading || !personalInfo || Object.keys(personalInfo).length === 0) {
    return (
      <Loading />
    )
  }

  return (
    <div className="flex-1 pt-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Personal Information
          </h1>
          <p className="text-gray-600">
            Enter your basic details and contact methods
          </p>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaUser className="inline mr-2 text-blue-600" />
              Full Name
            </label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => updateName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              placeholder="Your full name"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
              Location
            </label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updateLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              placeholder="City, Country"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              value={personalInfo.description}
              onChange={(e) => updateDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
              placeholder="A brief description about yourself..."
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              {personalInfo.description ? personalInfo.description.length : 0} characters
            </p>
          </div>

          {/* Contact Methods */}
          <ContactForm contacts={personalInfo.contact} setContactsAction={updateContacts} />

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies
            </label>
            <input
              value={personalInfo.hobbies.join(", ")}
              onChange={(e) => updateHobbies(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
            />
          </div>

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
  );
}
