import { Certification } from "@/types/resumeTypes";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Award,
  Trash2,
  Building2,
  Calendar,
} from "lucide-react";

function CertificationForm({
  certification,
  index,
  updateCertification,
  removeCertification,
  errors,
}: {
  certification: Certification;
  index: number;
  updateCertification: <K extends keyof Certification>(
    id: number,
    field: K,
    value: Certification[K]
  ) => void;
  removeCertification: (id: number) => void;
  errors?: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleFieldChange =
    (field: keyof Certification) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCertification(certification.id, field, e.target.value);
      };

  // 1. Minimized View
  if (!isOpen) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
        <div className="p-5 flex items-center justify-between">
          <div
            className="flex items-center gap-4 flex-1 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="p-3 rounded-lg bg-primary-600 text-white shadow-sm">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {certification.name || "(No Certification Name)"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="font-medium text-gray-700">
                  {certification.issuingOrganization || "Organization"}
                </span>
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
              <Trash2 size={14} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Expand certification entry"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Expanded View
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all ring-1 ring-primary-50">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary-600 text-white shadow-sm">
            <Award size={16} />
          </div>
          <h3 className="font-semibold text-gray-800">
            Certification #{index + 1}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeCertification(certification.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
          >
            <Trash2 size={12} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp size={16} />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
            Certification Name
          </label>
          <input
            type="text"
            value={certification.name}
            onChange={handleFieldChange("name")}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.name ? "border-red-500 bg-red-50/10" : "border-gray-200"
              }`}
          />
          {errors?.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
              Issuing Organization
            </label>
            <div className="relative">
              <Building2
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={certification.issuingOrganization}
                onChange={handleFieldChange("issuingOrganization")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-gray-400 bg-white ${errors?.issuingOrganization ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
              />
            </div>
            {errors?.issuingOrganization && <p className="text-xs text-red-500 mt-1">{errors.issuingOrganization}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
              Issue Date
            </label>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="month"
                value={certification.issueDate}
                onChange={handleFieldChange("issueDate")}
                className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all text-gray-700 bg-white ${errors?.issueDate ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  }`}
              />
            </div>
            {errors?.issueDate && <p className="text-xs text-red-500 mt-1">{errors.issueDate}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CertificationForm);
