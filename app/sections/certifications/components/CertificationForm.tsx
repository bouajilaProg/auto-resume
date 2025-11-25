import { Certification } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCertificate, FaTrash, FaBuilding, FaCalendarAlt } from "react-icons/fa";

export default function CertificationForm({ certification, index, updateCertification, removeCertification }: {
  certification: Certification;
  index: number;
  updateCertification: (id: number, field: keyof Certification, value: string) => void;
  removeCertification: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange = (field: keyof Certification) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateCertification(certification.id, field, e.target.value);
  };

  // 1. Minimized View (Summary)
  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 shadow-sm">
              <FaCertificate size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {certification.name || "(No Certification Name)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-gray-700">{certification.issuingOrganization || "Organization"}</span>
                {certification.issueDate && (
                  <>
                    <span>•</span>
                    <span>Issued {certification.issueDate}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => removeCertification(certification.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete certification entry"
            >
              <FaTrash size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Expand certification entry"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 2. Expanded View (Edit Mode)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-blue-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600 text-white shadow-sm">
            <FaCertificate size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Certification #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeCertification(certification.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
            aria-label="Delete certification entry"
          >
            <FaTrash size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Collapse certification entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">

        {/* Certification Name */}
        <div>
          <label htmlFor={`name-${certification.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Certification Name
          </label>
          <input
            id={`name-${certification.id}`}
            type="text"
            value={certification.name}
            onChange={handleFieldChange('name')}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
            placeholder="e.g., AWS Certified Solutions Architect - Associate"
          />
        </div>

        {/* Issuing Organization & Issue Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor={`organization-${certification.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Issuing Organization
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaBuilding size={12} />
              </div>
              <input
                id={`organization-${certification.id}`}
                type="text"
                value={certification.issuingOrganization}
                onChange={handleFieldChange('issuingOrganization')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label htmlFor={`issueDate-${certification.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Issue Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaCalendarAlt size={12} />
              </div>
              <input
                id={`issueDate-${certification.id}`}
                type="month"
                value={certification.issueDate}
                onChange={handleFieldChange('issueDate')}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
