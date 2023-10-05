import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./i18n/config";
import "@fontsource/montserrat";
import SelectLanguage from "./components/SelectLanguage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SelectLanguage/>
      <App />
    </Provider>
  </React.StrictMode>
);
