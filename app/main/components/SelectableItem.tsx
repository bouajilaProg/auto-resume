"use client";
import { useState } from "react";

interface SelectableItemProps {
  tite: string;
  description?: string;
  onToggle?: (selected: boolean) => void;
}

export function SelectableItem({ tite, description, onToggle }: SelectableItemProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleClick = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group cursor-pointer w-full px-4 py-3 border-2 transition-all duration-200 
        rounded-lg relative select-none flex flex-col
        /* Logic: Center if no description, else Left */
        ${description ? "items-start text-left" : "items-center text-center justify-center"}
        
        ${isSelected
          ? "bg-blue-50/50 border-blue-600 shadow-[0_0_0_1px_#2563eb]"
          : "bg-white border-gray-200 hover:border-blue-200 hover:bg-gray-50/50"
        }
      `}
    >
      <h4 className={`text-base font-bold leading-tight transition-colors ${isSelected ? "text-blue-700" : "text-gray-900"
        }`}>
        {tite}
      </h4>

      {description && (
        <p className={`text-sm mt-0.5 transition-colors ${isSelected ? "text-blue-600/70" : "text-gray-500"
          }`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SelectableItem;
