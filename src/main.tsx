import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import { hassStore } from "@/hass/store";
import { HomeAssistant } from "@/types/home-assistant";

import styles from "./index.css?inline";
import App from "./App";

class ReactDashboard extends HTMLElement {
  _hass: HomeAssistant | null = null;
  _root: ReactDOM.Root | null = null;
  _config: Record<string, string> = {};

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    hassStore.getState().updateHass(hass);
  }

  setConfig(config: typeof this._config) {
    this._config = config;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.append(styles);

    const root = document.createElement("div");

    hassStore.getState().initialize(root, this);

    this._root = ReactDOM.createRoot(root);
    this._root.render(
      <React.StrictMode>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </React.StrictMode>
    );

    shadow.appendChild(style);
    shadow.appendChild(root);
  }

  disconnectedCallback() {
    if (this._root) {
      this._root.unmount();
      this._root = null;
    }
  }
}

customElements.define("ha-react-dashboard", ReactDashboard);
