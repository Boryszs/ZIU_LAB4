import { lazy, Suspense, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppButton } from "./components/common/AppButton";
import { usePageTitle } from "./hooks/usePageTitle";

const ModalDialog = lazy(() =>
  import("./components/ModalDialog").then((module) => ({
    default: module.ModalDialog,
  })),
);

interface SettingsPageProps {
  title: string;
}

export default function SettingsPage({ title }: SettingsPageProps) {
  usePageTitle(title);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box component="section" sx={{ textAlign: "center" }}>
      <Typography component="h2" variant="h4" fontWeight={800} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Strona ustawień jest w budowie.
      </Typography>
      <AppButton
        type="button"
        variant="contained"
        aria-controls="settings-modal"
        aria-expanded={isModalOpen}
        aria-haspopup="dialog"
        onClick={() => setIsModalOpen(true)}
      >
        Otwórz okno modalne
      </AppButton>

      {isModalOpen && (
        <Suspense fallback={null}>
          <ModalDialog
            id="settings-modal"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Przykładowy modal"
          >
            <Typography>
              To jest treść okna modalnego. Fokus jest obsługiwany przez
              komponent Dialog z MUI. Naciśnij Escape lub przycisk Zamknij, aby
              wyjść.
            </Typography>
          </ModalDialog>
        </Suspense>
      )}
    </Box>
  );
}
