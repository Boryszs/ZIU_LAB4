import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  "details > summary",
].join(", ");

/**
 * FocusTrap — utrzymuje fokus klawiaturowy wewnątrz kontenera.
 *
 * @param {React.ReactNode} children — zawartość pułapki
 * @param {Function} onEscape — funkcja wywoływana przy naciśnięciu Escape
 * @param {React.RefObject} triggerRef — element, który otworzył pułapkę
 */

interface FocusTrapProps {
  children: React.ReactNode;
  onEscape?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function FocusTrap({ children, onEscape, triggerRef }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Pobierz wszystkie elementy z możliwością fokusu
    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => !el.closest('[aria-hidden="true"]'));
    // Ustaw fokus na pierwszym elemencie po podłączeniu komponentu
    const firstFocusable = getFocusable()[0];
    firstFocusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.key === "Escape") {
        onEscape?.();
        // Przywraca fokus do elementu, który otworzył pułapkę
        triggerRef?.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        // Shift+Tab: jeśli na pierwszym — przejdź na ostatni
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab: jeśli na ostatnim — przejdź na pierwszy
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Przywróć fokus przy odłączeniu komponentu
      // eslint-disable-next-line react-hooks/exhaustive-deps
      triggerRef?.current?.focus();
    };
  }, [onEscape, triggerRef]);

  return <div ref={containerRef}>{children}</div>;
}
