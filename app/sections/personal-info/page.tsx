"use client";

import { User, MapPin } from "lucide-react";
import ContactForm from "./components/ContactForm";
import SectionEditorLayout from "@/components/SectionEditorLayout";
import { usePersonalInfo } from "@hooks/ResumeSections/usePersonalInfo";
import Loading from "@/app/components/Loading";
import { useModal } from "@/context/Modal/useModal";
import ModalCreator from "@/context/Modal/modals/ModelsFactory";
import { useMemo } from "react";

export default function PersonalInfoPage() {
  const {
    personalInfo,
    errors,
    updateName,
    updateLocation,
    updateDescription,
    updateContacts,
    removeContact,
    handleSave,
    hasChanges,
    loading
  } = usePersonalInfo();

  const { openModal, closeModal } = useModal();
  const ConfirmModal = useMemo(() => ModalCreator("ConfirmSave", closeModal, () => {
    handleSave();
  }), [closeModal, handleSave]);

  if (loading || !personalInfo || Object.keys(personalInfo).length === 0) {
    return <Loading />;
  }

  return (
    <SectionEditorLayout
      title="Personal Information"
      description="Enter your basic details and contact methods"
      onSave={() => {
        if (hasChanges) openModal(ConfirmModal);
        else handleSave();
      }}
    >
      {errors.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Complete these details before saving:</p>
          <ul className="mt-2 list-disc pl-5">
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}

      {/* Content Area */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-primary-50 overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary-600 text-white shadow-sm">
                <User size={16} />
              </div>
              <h3 className="font-semibold text-gray-800">Basic Details</h3>
            </div>
          </div>

          <div className="p-3 space-y-4">
            <div className="grid grid-cols-1 @min-[28rem]:grid-cols-2 gap-4">
              {/* Name */}
              <div className="col-span-1 @min-[28rem]:col-span-2">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="col-span-1 @min-[28rem]:col-span-2">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-span-1 @min-[28rem]:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Description <span className="normal-case font-normal text-gray-400 ml-1">(Optional)</span>
                </label>
                <textarea
                  value={personalInfo.description}
                  onChange={(e) => updateDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none"
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
          contacts={personalInfo.contact || []}
          setContactsAction={updateContacts}
          removeContactAction={removeContact}
        />
      </div>
    </SectionEditorLayout>
  );
}
