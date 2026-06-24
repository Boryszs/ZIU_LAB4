import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  hasAnalyticsMeasurementId,
  initAnalytics,
  isAnalyticsInitialized,
  trackPageView,
} from "../analytics";
import { AppButton } from "./common/AppButton";

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

  if (consent === "accepted") {
    return null;
  }

  if (consent === "declined") {
    return (
      <aside
        aria-label="Status analityki"
        className="fixed bottom-4 left-4 z-[2000] rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text-secondary shadow-lg dark:border-appDark-border dark:bg-appDark-surface dark:text-appDark-text-primary"
      >
        <span>Analityka wylaczona</span>
        <AppButton
          type="button"
          onClick={() => {
            clearConsent();
            setConsent(null);
          }}
          compact
          tone="link"
          variant="text"
          sx={{ ml: 1 }}
        >
          Zmien
        </AppButton>
      </aside>
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
    <section
      aria-label="Zgoda na analityke"
      className="fixed inset-x-0 bottom-0 z-[2000] border-t border-app-border bg-app-surface px-4 py-4 text-app-text-primary shadow-consent dark:border-appDark-border dark:bg-appDark-surface dark:text-appDark-text-primary"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm leading-6">
          {hasAnalyticsMeasurementId()
            ? "Uzywamy opcjonalnej analityki GA4 tylko do statystyk UX: pageviews, klikniecia CTA oraz statusy formularzy. Nie wysylamy tresci pol ani danych osobowych."
            : "Analityka GA4 jest wylaczona, bo brakuje zmiennej REACT_APP_GA_MEASUREMENT_ID."}
        </p>

        <div className="flex shrink-0 flex-wrap gap-2">
          <AppButton
            type="button"
            onClick={declineAnalytics}
            compact
            tone="neutral"
            variant="outlined"
          >
            Odrzuc
          </AppButton>
          <AppButton
            type="button"
            onClick={acceptAnalytics}
            disabled={!hasAnalyticsMeasurementId()}
            compact
            variant="contained"
          >
            Akceptuj
          </AppButton>
        </div>
      </div>
    </section>
  );
}
