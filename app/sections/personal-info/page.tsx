"use client";
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Contact, ContactType, PersonalInfo } from '@/types/resumeTypes';
import ContactForm from './components/ContactForm';
import { mockResumeData } from '@/db/mock-data';


export default function PersonalInfoPage() {


  // init
  useEffect(() => {
    // get personal info from mock-data
    setPersonalInfo(mockResumeData.personalInfo)
  }, []);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    location: "",
    description: "",
    contact: []
  });

  function updateName(name: string) {
    setPersonalInfo({ ...personalInfo, name });
  }

  function updateLocation(location: string) {
    setPersonalInfo({ ...personalInfo, location });
  }

  function updateDescription(description: string) {
    setPersonalInfo({ ...personalInfo, description });
  }

  function updateContacts(contacts: Contact[]) {
    setPersonalInfo({ ...personalInfo, contact: contacts });
  }

  function handleSave() {
    // Implement save logic here (e.g., send data to backend or update global state)
    console.log("Saved Personal Info:", personalInfo);
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h1>
            <p className="text-gray-600">Enter your basic details and contact methods</p>
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
                placeholder="A brief description about yourself, your professional summary, or career objectives..."
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                {personalInfo.description.length} characters
              </p>
            </div>

            {/* Contact Methods */}
            <ContactForm contacts={personalInfo.contact} setContacts={updateContacts} />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Changes
              </button>
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
