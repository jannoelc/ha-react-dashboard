import { createStore } from "zustand";
import { HomeAssistant } from "@/types/home-assistant";

export interface HassState {
  hass: HomeAssistant | null;
  rootElement: HTMLElement | null;
  customElementInstance: HTMLElement | null;
}

interface HassActions {
  updateHass(hass: HomeAssistant): void;
  initialize(root: HTMLElement | null, instance: HTMLElement | null): void;
}

export const hassStore = createStore<HassState & HassActions>()((set) => ({
  hass: null,
  rootElement: null,
  customElementInstance: null,
  updateHass(hass: HomeAssistant) {
    set({ hass });
  },
  initialize(rootElement, customElementInstance) {
    set({ rootElement, customElementInstance });
  },
}));
