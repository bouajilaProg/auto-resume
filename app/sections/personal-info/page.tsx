"use client";
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface ContactMethod {
  id: number;
  type: string;
  value: string;
}

interface ContactType {
  value: string;
  label: string;
  icon: IconType;
  placeholder: string;
}

export default function PersonalInfoForm() {
  const [name, setName] = useState<string>("Mohamed Yessine Bouajila");
  const [location, setLocation] = useState<string>("bizerte");
  const [description, setDescription] = useState<string>("");

  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([
    { id: 1, type: "email", value: "bouajilamedyessine@gmail.com" },
    { id: 2, type: "phone", value: "+216-28-747-707" },
    { id: 3, type: "website", value: "http://bouajilaProg.com/" },
    { id: 4, type: "github", value: "bouajilaProg" },
    { id: 5, type: "linkedin", value: "mohamed-yessine-bouajila" }
  ]);

  const contactTypes: ContactType[] = [
    { value: "email", label: "Email", icon: FaEnvelope, placeholder: "your@email.com" },
    { value: "phone", label: "Phone", icon: FaPhone, placeholder: "+216-XX-XXX-XXX" },
    { value: "website", label: "Website", icon: FaGlobe, placeholder: "https://yourwebsite.com" },
    { value: "github", label: "GitHub", icon: FaGithub, placeholder: "username" },
    { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, placeholder: "username" },
    { value: "twitter", label: "Twitter", icon: FaTwitter, placeholder: "username" },
    { value: "instagram", label: "Instagram", icon: FaInstagram, placeholder: "username" }
  ];

  const getContactTypeInfo = (type: string): ContactType => {
    return contactTypes.find(ct => ct.value === type) || contactTypes[0];
  };

  const addContactMethod = () => {
    const newId = contactMethods.length > 0 ? Math.max(...contactMethods.map(c => c.id)) + 1 : 1;
    setContactMethods([...contactMethods, { id: newId, type: "email", value: "" }]);
  };

  const removeContactMethod = (id: number) => {
    setContactMethods(contactMethods.filter(c => c.id !== id));
  };

  const updateContactMethod = (id: number, field: keyof ContactMethod, value: string) => {
    setContactMethods(contactMethods.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSave = () => {
    const formData = {
      name,
      location,
      description,
      contactMethods
    };
    console.log("Saved Data:", formData);
    alert("Changes saved! Check console for data.");
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                placeholder="A brief description about yourself, your professional summary, or career objectives..."
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length} characters
              </p>
            </div>

            {/* Contact Methods */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Methods <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <button
                  onClick={addContactMethod}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Contact
                </button>
              </div>

              {contactMethods.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FaEnvelope className="mx-auto text-gray-400 text-4xl mb-3" />
                  <p className="text-gray-500 mb-4">No contact methods added yet</p>
                  <button
                    onClick={addContactMethod}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <FaPlus size={14} />
                    Add Your First Contact
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {contactMethods.map((contact) => {
                    const typeInfo = getContactTypeInfo(contact.type);
                    const Icon = typeInfo.icon;

                    return (
                      <div key={contact.id} className="flex gap-3 items-start">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <select
                              value={contact.type}
                              onChange={(e) => updateContactMethod(contact.id, 'type', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                            >
                              {contactTypes.map(ct => (
                                <option key={ct.value} value={ct.value}>
                                  {ct.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="relative">
                            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                            <input
                              type="text"
                              value={contact.value}
                              onChange={(e) => updateContactMethod(contact.id, 'value', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                              placeholder={typeInfo.placeholder}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeContactMethod(contact.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

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
