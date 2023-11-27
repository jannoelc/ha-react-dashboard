declare global {
  interface HASSDomEvents {}
}

export type ValidHassDomEvent =
  | keyof HASSDomEvents
  | "hass-toggle-menu"
  | "hass-show-notifications";

export interface HASSDomEvent<T> extends Event {
  detail: T;
}

export const fireEvent = <HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail?: any,
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
) => {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  const event = new Event(type, {
    bubbles: options.bubbles === undefined ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === undefined ? true : options.composed,
  });
  // @ts-expect-error Copied from home-assistant/frontend
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};
