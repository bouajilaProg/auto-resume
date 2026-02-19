import React from "react";

interface VersionModalContentProps {
  label: string;
  value: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  onChange: (value: string) => void;
}

function VersionModalContent({
  label,
  value,
  placeholder,
  helperText,
  error,
  onChange,
}: VersionModalContentProps) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${
          error ? "border-red-300" : "border-gray-200"
        }`}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default React.memo(VersionModalContent);
