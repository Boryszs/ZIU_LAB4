import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const SESSION_STORAGE_KEY = "analytics_session_id";

let isInitialized = false;
let lastTrackedPage = "";

const debugAnalytics = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${message}`);
  }
};

const createSessionId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
    (
      Number(char) ^
      (Math.floor(Math.random() * 16) >> (Number(char) / 4))
    ).toString(16),
  );
};

const getAnalyticsSessionId = () => {
  if (typeof window === "undefined") return undefined;

  const savedSessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (savedSessionId) {
    return savedSessionId;
  }

  const sessionId = createSessionId();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);

  return sessionId;
};

export const initAnalytics = () => {
  if (isInitialized) return;

  if (!GA_MEASUREMENT_ID) {
    debugAnalytics("GA4 disabled: missing REACT_APP_GA_MEASUREMENT_ID");
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      anonymize_ip: true,
      allowAdFeatures: false,
      allowAdPersonalizationSignals: false,
    },
    gtagOptions: {
      send_page_view: false,
    },
  });

  isInitialized = true;
  debugAnalytics("GA4 initialized after consent");
};

export const isAnalyticsInitialized = () => isInitialized;

export const hasAnalyticsMeasurementId = () => Boolean(GA_MEASUREMENT_ID);

export const trackPageView = (page: string) => {
  if (!isInitialized || page === lastTrackedPage) return;

  lastTrackedPage = page;
  debugAnalytics(`page_view: ${page}`);
  ReactGA.send({
    hitType: "pageview",
    page,
    app_session_id: getAnalyticsSessionId(),
  });
};

/*
  RODO - zasada minimalizacji:
  GA4 zbiera tylko techniczne dane pomiarowe potrzebne do statystyk uzycia:
  sciezke strony, referrer, przyblizony czas wizyty, typ urzadzenia/przegladarki
  oraz pseudonimowy identyfikator klienta/sesji. Adres IP jest anonimizowany,
  a dodatkowy app_session_id jest losowym UUID w sessionStorage, bez powiazania
  z imieniem, nazwiskiem, e-mailem ani trescia formularzy.
  Zdarzenia niestandardowe ponizej wysylaja wylacznie metadane akcji
  (nazwa CTA, nazwa formularza, krok/status), bez imienia, nazwiska, e-maila,
  hasla, tresci zadania ani kategorii. Te dane sa niezbedne do oceny, czy
  uzytkownicy znajduja kluczowe akcje, gdzie porzucaja formularz i czy submit
  konczy sie powodzeniem.
  Ograniczenie celu: dane sluza tylko do statystyk UX, bez profilowania
  reklamowego; sygnaly reklamowe GA sa wylaczone w konfiguracji.
  Cookie consent: initAnalytics jest wywolywane dopiero po akceptacji analityki.
  Retencja: w panelu GA4 nalezy ustawic przechowywanie danych na maks. 14 mies.
  Polityka prywatnosci: README dokumentuje page_view, cta_click,
  form_abandonment i form_submit wraz z celem oraz zakresem danych.

  Checklist anonimizacji:
  - IP anonimizowane na poziomie konfiguracji: anonymize_ip: true.
  - Session ID to UUID z sessionStorage, bez powiazania z danymi osobowymi.
  - Brak zbierania tresci wpisanych w formularze.
  - Retencja danych ograniczana w panelu GA4 do maks. 14 miesiecy.
  - Cookie consent blokuje inicjalizacje GA4 do czasu akceptacji.

  Weryfikacja non render-blocking:
  react-ga4 tworzy tag gtag.js dynamicznie z script.async = true i dodaje go do
  document.body, wiec skrypt nie blokuje pierwszego renderowania HTML.
*/
export const trackCtaClick = (ctaName: string, location: string) => {
  if (!isInitialized) return;

  debugAnalytics(`cta_click: ${ctaName}`);
  ReactGA.event("cta_click", {
    cta_name: ctaName,
    location,
    app_session_id: getAnalyticsSessionId(),
  });
};

export const trackFormAbandonment = (formName: string, step?: number) => {
  if (!isInitialized) return;

  debugAnalytics(`form_abandonment: ${formName}`);
  ReactGA.event("form_abandonment", {
    form_name: formName,
    step,
    app_session_id: getAnalyticsSessionId(),
  });
};

export const trackFormSubmit = (formName: string, status: string) => {
  if (!isInitialized) return;

  debugAnalytics(`form_submit: ${formName} (${status})`);
  ReactGA.event("form_submit", {
    form_name: formName,
    status,
    app_session_id: getAnalyticsSessionId(),
  });
};
