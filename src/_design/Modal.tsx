import React, { useEffect, useRef, ReactNode } from "react";

// 🔑 Define Props Interface for Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  // ✅ Strongly Typed Ref
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // ✅ Add event listener only if the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // ✅ Cleanup event listener on unmount or when closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 🔄 If modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        {/* ✅ Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>

        {/* ✅ Modal Content */}
        <div className="mt-4 text-gray-700 dark:text-gray-300">{children}</div>

        {/* ✅ Modal Actions */}
        {actions && (
          <div className="mt-6 flex justify-end space-x-2">{actions}</div>
        )}
      </div>
    </div>
  );
};
