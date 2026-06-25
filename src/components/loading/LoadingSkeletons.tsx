import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

interface LoadingStateProps {
  label?: string;
}

interface FormPageSkeletonProps extends LoadingStateProps {
  contained?: boolean;
  showHeading?: boolean;
}

const drawerWidth = 264;

const loadingStateProps = (label: string) => ({
  role: "status",
  "aria-live": "polite" as const,
  "aria-label": label,
  "aria-busy": true,
});

export function AppShellSkeleton({
  label = "Ładowanie aplikacji",
}: LoadingStateProps) {
  return (
    <Box
      {...loadingStateProps(label)}
      sx={{ minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          inset: "0 auto 0 0",
          width: drawerWidth,
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          p: 3,
        }}
      >
        <Skeleton variant="rounded" width="70%" height={40} />
        <Stack spacing={2} sx={{ mt: 6 }}>
          {[0, 1, 2, 3].map((item) => (
            <Skeleton key={item} variant="rounded" height={48} />
          ))}
        </Stack>
      </Box>
      <Box
        id="main-content"
        component="main"
        tabIndex={-1}
        aria-label="Główna zawartość aplikacji"
        sx={{
          ml: { xs: 0, md: `${drawerWidth}px` },
          p: { xs: 2, sm: 3 },
        }}
      >
        <Skeleton variant="rounded" height={64} />
        <PageSkeleton />
      </Box>
    </Box>
  );
}

export function PageSkeleton({
  label = "Ładowanie strony",
}: LoadingStateProps) {
  return (
    <Box
      {...loadingStateProps(label)}
      sx={{ width: "100%", pt: { xs: 3, md: 4 } }}
    >
      <Skeleton variant="text" width="min(55%, 320px)" height={48} />
      <Skeleton variant="text" width="min(80%, 520px)" />
      <Skeleton
        variant="rounded"
        height={220}
        sx={{ mt: 3, borderRadius: 2 }}
      />
    </Box>
  );
}

export function TodoListSkeleton({
  label = "Ładowanie zadań",
}: LoadingStateProps) {
  return (
    <Stack
      {...loadingStateProps(label)}
      spacing={1}
      sx={{ mx: "auto", my: 3, width: "100%", maxWidth: 700 }}
    >
      {[0, 1, 2].map((item) => (
        <Paper
          key={item}
          variant="outlined"
          sx={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr) auto",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Box>
            <Skeleton width={`${78 - item * 9}%`} />
            <Skeleton width="35%" />
          </Box>
          <Skeleton variant="rounded" width={72} height={28} />
        </Paper>
      ))}
    </Stack>
  );
}

export function FormPageSkeleton({
  contained = false,
  label = "Ładowanie formularza",
  showHeading = true,
}: FormPageSkeletonProps) {
  const skeletonContent = (
    <Paper
      variant="outlined"
      sx={{ mt: showHeading ? 2 : 0, p: { xs: 2, sm: 3 } }}
    >
      <Stack spacing={3}>
        <Skeleton variant="rounded" height={56} />
        <Skeleton variant="rounded" height={56} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Skeleton variant="rounded" height={44} sx={{ flex: 1 }} />
          <Skeleton variant="rounded" height={44} sx={{ flex: 1 }} />
        </Stack>
      </Stack>
    </Paper>
  );

  if (contained) {
    return (
      <Box {...loadingStateProps(label)}>
        {skeletonContent}
      </Box>
    );
  }

  return (
    <Box
      {...loadingStateProps(label)}
      sx={{
        mx: "auto",
        width: "100%",
        maxWidth: 560,
        py: { xs: 2, md: 3 },
      }}
    >
      {showHeading && (
        <Skeleton variant="text" width="60%" height={48} />
      )}
      {skeletonContent}
    </Box>
  );
}
