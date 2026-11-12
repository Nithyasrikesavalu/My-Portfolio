import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "theme";
const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

const read = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* storage unavailable */ }
  return "dark";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#17051F" : "#FFFBF4");
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
