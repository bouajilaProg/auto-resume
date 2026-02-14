"use client";

import { User, MapPin, Save, X } from "lucide-react";
import ContactForm from "./components/ContactForm";
import Link from "next/link";
import { usePersonalInfo } from "@hooks/ResumeSections/usePersonalInfo";
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
    handleSave,
    hasChanges,
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
              <X size={14} />
              <span>Cancel</span>
            </Link>
            <button
              onClick={() => {
                if (hasChanges) {
                  openModal(ConfirmModal);
                } else {
                  handleSave();
                }
              }}
              className="flex-1 sm:flex-none justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center gap-2 font-medium shadow-md"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-indigo-50 overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                  <User size={16} />
                </div>
                <h3 className="font-semibold text-gray-800">Basic Details</h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) => updateName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      value={personalInfo.location}
                      onChange={(e) => updateLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Description <span className="normal-case font-normal text-gray-400 ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={personalInfo.description}
                    onChange={(e) => updateDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none"
                    placeholder="A brief description about yourself..."
                    rows={4}
                  />
                  <div className="flex justify-end mt-1">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">
                      {personalInfo.description ? personalInfo.description.length : 0} characters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <ContactForm
            contacts={personalInfo.contact}
            setContactsAction={updateContacts}
          />
        </div>
      </div>
    </div>
  );
}
