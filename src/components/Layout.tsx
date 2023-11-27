import React, { RefObject, createContext, useRef } from "react";
import cx from "clsx";

import { useHass } from "@/hooks/hass";
import { Navbar } from "@/components/Navbar";

export const Context = createContext<RefObject<HTMLElement | null>>({
  current: null,
});

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const darkMode = useHass(({ hass }) => hass?.themes.darkMode ?? true);
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      className={cx(
        darkMode ? "dark" : "light",
        "text-foreground bg-background min-h-screen"
      )}
      ref={mainRef}
    >
      <Context.Provider value={mainRef}>
        <Navbar />
        <div className="container mx-auto p-2">{children}</div>
      </Context.Provider>
    </main>
  );
};
