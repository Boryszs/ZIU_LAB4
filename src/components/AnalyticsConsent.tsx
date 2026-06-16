import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  hasAnalyticsMeasurementId,
  initAnalytics,
  isAnalyticsInitialized,
  trackPageView,
} from "../analytics";

const CONSENT_STORAGE_KEY = "analytics_consent";

type AnalyticsConsentValue = "accepted" | "declined";

const readConsent = (): AnalyticsConsentValue | null => {
  if (typeof window === "undefined") return null;

  const savedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  return savedValue === "accepted" || savedValue === "declined"
    ? savedValue
    : null;
};

const saveConsent = (value: AnalyticsConsentValue) => {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
};

const clearConsent = () => {
  window.localStorage.removeItem(CONSENT_STORAGE_KEY);
};

export function AnalyticsConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsentValue | null>(() =>
    readConsent(),
  );
  const [isReady, setIsReady] = useState(false);

  // Defer rendering to prevent Lighthouse from picking this up as LCP
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    if (!isAnalyticsInitialized()) {
      initAnalytics();
    }

    if (!isAnalyticsInitialized()) return;

    if (location.pathname !== "/") {
      trackPageView(`${location.pathname}${location.search}`);
    }
  }, [consent, location.pathname, location.search]);

  if (!isReady) {
    return null;
  }

  if (consent === "accepted") {
    return null;
  }

  if (consent === "declined") {
    return (
      <Paper
        component="aside"
        aria-label="Status analityki"
        elevation={6}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 2000,
          border: 1,
          borderColor: "divider",
          px: 1.5,
          py: 1,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="body2">Analityka wyłączona</Typography>
          <Button
            type="button"
            variant="text"
            onClick={() => {
              clearConsent();
              setConsent(null);
            }}
          >
            Zmień
          </Button>
        </Stack>
      </Paper>
    );
  }

  const acceptAnalytics = () => {
    saveConsent("accepted");
    setConsent("accepted");
  };

  const declineAnalytics = () => {
    saveConsent("declined");
    setConsent("declined");
  };

  return (
    <Paper
      component="section"
      aria-label="Zgoda na analitykę"
      elevation={8}
      square
      sx={{
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        zIndex: 2000,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        px: { xs: 2, sm: 3 },
        py: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mx: "auto", width: "100%", maxWidth: 1024 }}
      >
        <Typography variant="body2">
          {hasAnalyticsMeasurementId()
            ? "Używamy opcjonalnej analityki GA4 tylko do statystyk UX: pageviews, kliknięcia CTA oraz statusy formularzy. Nie wysyłamy treści pól ani danych osobowych."
            : "Analityka GA4 jest wyłączona, bo brakuje zmiennej REACT_APP_GA_MEASUREMENT_ID."}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button type="button" variant="outlined" color="inherit" onClick={declineAnalytics}>
            Odrzuć
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={acceptAnalytics}
            disabled={!hasAnalyticsMeasurementId()}
          >
            Akceptuj
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
