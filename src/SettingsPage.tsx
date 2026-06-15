import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ModalDialog } from "./components/ModalDialog";

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box component="section" sx={{ textAlign: "center" }}>
      <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 2 }}>
        Ustawienia
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Strona ustawień jest w budowie.
      </Typography>
      <Button
        ref={openModalButtonRef}
        type="button"
        variant="contained"
        aria-controls="settings-modal"
        aria-expanded={isModalOpen}
        aria-haspopup="dialog"
        onClick={() => setIsModalOpen(true)}
      >
        Otwórz okno modalne
      </Button>

      <ModalDialog
        id="settings-modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerRef={openModalButtonRef}
        title="Przykładowy modal"
      >
        <Typography>
          To jest treść okna modalnego. Fokus jest obsługiwany przez komponent
          Dialog z MUI. Naciśnij Escape lub przycisk Zamknij, aby wyjść.
        </Typography>
      </ModalDialog>
    </Box>
  );
}
