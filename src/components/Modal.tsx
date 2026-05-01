import React from "react";
import { FocusTrap } from "./FocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
  title,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <FocusTrap onEscape={onClose} triggerRef={triggerRef}>
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800">
          <h2 id="modal-title" className="text-xl font-bold dark:text-white">
            {title}
          </h2>
          <div className="mt-4 text-slate-700 dark:text-slate-300">
            {children}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="rounded-lg bg-[#1565C0] px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Zamknij
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};
