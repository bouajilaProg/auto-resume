import { Certification } from "@/types/resumeTypes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCertificate, FaTrash } from "react-icons/fa";

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

  if (!isOpen) {
    return (
      <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaCertificate className="text-blue-600" />
            Certification #{index + 1}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => removeCertification(certification.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              aria-label="Delete certification entry"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              aria-label="Expand certification entry"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
        {/* details part */}
        <div>
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {certification.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Organization:</span> {certification.issuingOrganization}</p>
          <p className="text-gray-700"><span className="font-semibold">Issue Date:</span> {certification.issueDate}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaCertificate className="text-blue-600" />
          Certification #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeCertification(certification.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Delete certification entry"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-label="Collapse certification entry"
          >
            <FaChevronUp />
          </button>
        </div>
      </div>

      {/* Certification Name */}
      <div>
        <label htmlFor={`name-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Certification Name
        </label>
        <input
          id={`name-${certification.id}`}
          type="text"
          value={certification.name}
          onChange={handleFieldChange('name')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., Certified JavaScript Developer"
        />
      </div>

      {/* Issuing Organization */}
      <div>
        <label htmlFor={`organization-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Issuing Organization
        </label>
        <input
          id={`organization-${certification.id}`}
          type="text"
          value={certification.issuingOrganization}
          onChange={handleFieldChange('issuingOrganization')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
          placeholder="e.g., Tech Institute"
        />
      </div>

      {/* Issue Date */}
      <div>
        <label htmlFor={`issueDate-${certification.id}`} className="block text-sm font-medium text-gray-700 mb-2">
          Issue Date
        </label>
        <input
          id={`issueDate-${certification.id}`}
          type="month"
          value={certification.issueDate}
          onChange={handleFieldChange('issueDate')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
