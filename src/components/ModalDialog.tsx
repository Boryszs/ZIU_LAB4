import { useId, type ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AppButton } from "./common/AppButton";

interface ModalDialogProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function ModalDialog({
  id,
  isOpen,
  onClose,
  title,
  children,
}: ModalDialogProps) {
  const generatedTitleId = useId();
  const generatedDescriptionId = useId();
  const titleId = `${generatedTitleId}-title`;
  const descriptionId = `${generatedDescriptionId}-description`;

  return (
    <Dialog
      id={id}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent id={descriptionId}>{children}</DialogContent>
      <DialogActions sx={{ flexWrap: "wrap", gap: 1, px: 3, pb: 3 }}>
        <AppButton type="button" variant="outlined" tone="neutral" onClick={onClose}>
          Zamknij
        </AppButton>
        <AppButton type="button" variant="contained" onClick={onClose}>
          OK
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
