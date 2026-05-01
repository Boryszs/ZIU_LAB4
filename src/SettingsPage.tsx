import { useRef, useState } from "react";
import { ModalDialog } from "./components/ModalDialog";

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="text-center">
      <h2 className="mb-4 text-2xl font-bold">Ustawienia</h2>
      <p className="mb-6">Strona ustawień jest w budowie.</p>
      <button
        ref={openModalButtonRef}
        type="button"
        aria-controls="settings-modal"
        aria-expanded={isModalOpen}
        aria-haspopup="dialog"
        onClick={() => setIsModalOpen(true)}
        className="rounded-md bg-slate-700 px-4 py-2 text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500"
      >
        Otwórz okno modalne
      </button>

      <ModalDialog
        id="settings-modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerRef={openModalButtonRef}
        title="Przykładowy Modal"
      >
        <p>
          To jest treść okna modalnego. Fokus jest uwięziony wewnątrz. Naciśnij
          Escape lub przycisk Zamknij, aby wyjść.
        </p>
      </ModalDialog>
    </section>
  );
}
