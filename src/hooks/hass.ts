import { UseBoundStore, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { HassState, hassStore } from "../hass/store";

// @ts-expect-error We want to prevent updateHass to be used by this hook
export const useHass: UseBoundStore<StoreApi<HassState>> = (
  selector,
  compareFn
) => useStoreWithEqualityFn(hassStore, selector, compareFn);

export const useCustomElement = () =>
  useHass(({ customElementInstance }) => customElementInstance);
