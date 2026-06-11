import { useId, type ReactNode, type RefObject } from "react";
import { FocusTrap } from "./FocusTrap";

interface ModalDialogProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  triggerRef?: RefObject<HTMLElement | null>;
}

export function ModalDialog({
  id,
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}: ModalDialogProps) {
  const generatedTitleId = useId();
  const generatedDescriptionId = useId();
  const titleId = `${generatedTitleId}-title`;
  const descriptionId = `${generatedDescriptionId}-description`;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <FocusTrap onEscape={onClose} triggerRef={triggerRef}>
        <div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 id={titleId} className="text-xl font-bold dark:text-white">
            {title}
          </h2>
          <div
            id={descriptionId}
            className="mt-4 text-slate-700 dark:text-slate-300"
          >
            {children}
          </div>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              Zamknij
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-[#1565C0] px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              OK
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
