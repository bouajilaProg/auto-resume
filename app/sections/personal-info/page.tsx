"use client";

import { FaUser, FaMapMarkerAlt, FaSave, FaTimes } from "react-icons/fa";
import ContactForm from "./components/ContactForm";
import Link from "next/link";
import { usePersonalInfo } from "@/hooks/usePersonalInfo";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";

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

  const { openModal, closeModal } = useModal();
  const ConfirmModal = ModalCreator("ConfirmSave", closeModal, () => {
    handleSave();
  });

  if (loading || !personalInfo || Object.keys(personalInfo).length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section with Actions on Top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Personal Information
            </h1>
            <p className="text-gray-500 mt-1">
              Enter your basic details and contact methods
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/sections"
              className="flex-1 sm:flex-none justify-center px-4 py-2.5 border border-gray-200 text-gray-600 bg-white rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all flex items-center gap-2 font-medium shadow-sm"
            >
              <FaTimes size={14} />
              <span>Cancel</span>
            </Link>
            <button
              onClick={() => {
                openModal(ConfirmModal);
              }}
              className="flex-1 sm:flex-none justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2 font-medium shadow-md"
            >
              <FaSave size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
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
              {personalInfo.description ? personalInfo.description.length : 0}{" "}
              characters
            </p>
          </div>

          {/* Contact Methods */}
          <ContactForm
            contacts={personalInfo.contact}
            setContactsAction={updateContacts}
          />

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies
            </label>
            <input
              value={personalInfo.hobbies.join(", ")}
              onChange={(e) => updateHobbies(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
              placeholder="Reading, Coding, Traveling..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
