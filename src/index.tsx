import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

async function enableMocking() {
  // if (process.env.NODE_ENV !== "development") {
  //   console.log("Mocking is disabled in production mode.");
  //   return;
  // }

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest(request, print) {
      return;
    },
    serviceWorker: {
      url:
        window.location.hostname === "localhost"
          ? "/mockServiceWorker.js"
          : "/ZIU_LAB4/mockServiceWorker.js",
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

reportWebVitals();
