"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface GenericModalProps {
  isOpen: boolean;               // controls visibility
  onClose: () => void;           // close callback
  title?: string;                // optional modal title
  children: ReactNode;           // content inside the modal
  footer?: ReactNode;            // optional footer (buttons, actions)
}

export default function GenericModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: GenericModalProps) {
  // Ensure portal div exists
  useEffect(() => {
    if (!document.getElementById("modal-root")) {
      const modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-3 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-red-500 cursor-pointer"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Optional Title */}
        {title && <h2 className="text-xl font-semibold mb-1 text-black">{title}</h2>}

        {/* Content */}
        <div>{children}</div>

        {/* Optional Footer */}
        {footer && <div className="flex justify-end">{footer}</div>}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}