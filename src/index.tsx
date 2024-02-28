import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./locale";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventsContext } from "./contexts/eventContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <EventsContext>
        <App />
      </EventsContext>
      <ToastContainer />
    </BrowserRouter>
  </I18nextProvider>
);
reportWebVitals();
