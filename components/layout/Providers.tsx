"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

interface ThemeContextValue {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  resolvedTheme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const useIsomorphicLayoutEffect = 
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const pathname = usePathname();

  const applyTheme = (t: Theme) => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", t === "dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setThemeState(initial);
  }, []);

  useIsomorphicLayoutEffect(() => {
    applyTheme(theme);
  }, [theme, pathname]);

  return (
    <ThemeContext.Provider value={{ resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}