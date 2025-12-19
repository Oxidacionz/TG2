import { useEffect, useState } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return Theme.LIGHT;

    // 1. Prioridad: Lo que el usuario eligió manualmente
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) return savedTheme;

    // 2. Si no hay elección, usar preferencia del sistema (matchMedia)
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? Theme.DARK : Theme.LIGHT;
  });

  useEffect(() => {
    // Sincronizamos el atributo visual y la persistencia
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return { theme, toggleTheme };
};
