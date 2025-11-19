"use client"
import { mockResumeData } from '@/db/mock-data';
import { useState } from 'react';
import { FaPlus, FaCertificate } from 'react-icons/fa';
import Link from 'next/link';
import { Certification } from '@/types/resumeTypes';
import CertificationForm from './components/CertificationForm';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>(mockResumeData.certifications ?? []);

  const addCertification = () => {
    const newId = certifications.length > 0 ? Math.max(...certifications.map(c => c.id)) + 1 : 1;
    setCertifications([...certifications, {
      id: newId,
      name: "",
      issuingOrganization: "",
      issueDate: ""
    }]);
  };

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  const updateCertification = (id: number, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSave = () => {
    console.log("Saved Certifications Data:", certifications);
    alert("Changes saved! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Certifications</h1>
            <p className="text-gray-600">Showcase your professional certifications and credentials</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Certification Entries
              </label>
              <button
                onClick={addCertification}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus size={14} />
                Add Certification
              </button>
            </div>

            {certifications.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FaCertificate className="mx-auto text-gray-400 text-4xl mb-3" />
                <p className="text-gray-500 mb-4">No certifications added yet</p>
                <button
                  onClick={addCertification}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus size={14} />
                  Add Your First Certification
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {certifications.map((certification, index) => (
                  <CertificationForm
                    key={certification.id}
                    certification={certification}
                    index={index}
                    updateCertification={updateCertification}
                    removeCertification={removeCertification}
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
