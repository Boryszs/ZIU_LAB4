import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TodoFormPageLayoutProps {
  children: ReactNode;
  headingId: string;
  title: string;
}

export function TodoFormPageLayout({
  children,
  headingId,
  title,
}: TodoFormPageLayoutProps) {
  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{
        mx: "auto",
        width: "100%",
        maxWidth: 560,
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        id={headingId}
        component="h1"
        variant="h4"
        fontWeight={800}
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
