import React, { useEffect, useRef } from "react";

export const Modal = ({ isOpen, onClose, title, children, actions }) => {
  const modalRef = useRef(null); // Reference to the modal content

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for clicks
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 text-gray-700 dark:text-gray-300">{children}</div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-2">{actions}</div>
      </div>
    </div>
  );
};
