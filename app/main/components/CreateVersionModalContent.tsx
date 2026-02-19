import React, { useEffect, useRef, useState } from "react";

interface CreateVersionModalContentProps {
  onCreate: (name: string) => void;
  onCancel: () => void;
}

function CreateVersionModalContent({ onCreate, onCancel }: CreateVersionModalContentProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a name for this version.");
      return;
    }
    onCreate(trimmed);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Version name
        </label>
        <input
          ref={inputRef}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
            if (event.key === "Escape") onCancel();
          }}
          placeholder="e.g. Product Designer 2026"
          className={`w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        />
        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : (
          <p className="text-xs text-gray-500">Keep it short and specific.</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="px-4 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Create version
        </button>
      </div>
    </div>
  );
}

export default React.memo(CreateVersionModalContent);
