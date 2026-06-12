import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
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

export function AnalyticsConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsentValue | null>(() =>
    readConsent(),
  );

  useEffect(() => {
    if (consent !== "accepted" || isAnalyticsInitialized()) return;

    initAnalytics();

    if (location.pathname !== "/") {
      trackPageView(`${location.pathname}${location.search}`);
    }
  }, [consent, location.pathname, location.search]);

  if (consent) {
    return null;
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
      className="fixed inset-x-0 bottom-0 z-[2000] border-t border-slate-300 bg-white px-4 py-4 text-slate-900 shadow-[0_-8px_24px_rgba(15,23,42,0.14)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 text-sm leading-6">
          Uzywamy opcjonalnej analityki GA4 tylko do statystyk UX: pageviews,
          klikniecia CTA oraz statusy formularzy. Nie wysylamy tresci pol ani
          danych osobowych.
        </p>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={declineAnalytics}
            className="min-h-[40px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Odrzuc
          </button>
          <button
            type="button"
            onClick={acceptAnalytics}
            className="min-h-[40px] rounded-lg bg-[#1565C0] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0D47A1] focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Akceptuj
          </button>
        </div>
      </div>
    </section>
  );
}
