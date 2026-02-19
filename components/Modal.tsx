"use client";
import { useModal } from "@/context/Modal/useModal";
import { FC } from "react";

const Modal: FC = () => {
  const { title, description, content, buttons, isOpen, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  const handleButtonClick = (onClick: () => void | boolean) => {
    const result = onClick();
    if (result !== false) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-lg transition-all animate-in fade-in duration-200"
        onClick={closeModal}
      ></div>

      {/* Modal Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-lg pointer-events-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">

          {/* Header */}
          <div className="pb-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <p className="mt-4 text-gray-600">
            {description}
          </p>
          {content && (
            <div className="mt-4">
              {content}
            </div>
          )}

          {/* Footer (Buttons) */}
          {buttons.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button.onClick)}
                  disabled={button.disabled}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                    button.variant === "danger"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : button.variant === "secondary"
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
