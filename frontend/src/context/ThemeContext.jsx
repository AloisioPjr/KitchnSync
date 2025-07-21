// React imports for context, state, and side effects
import React, { createContext, useState, useEffect } from "react";

// Create a context to manage and share theme state across the app
export const ThemeContext = createContext();

// Context provider component to wrap the app and provide theme control
export const ThemeProvider = ({ children }) => {
  // State to track whether dark mode is enabled
  const [isDark, setIsDark] = useState(() => {
    // Load theme preference from sessionStorage, default to dark mode if not set
    const saved = sessionStorage.getItem("theme");
    return saved === "dark" || saved === null;
  });

  // Effect: applies or removes the "dark" class to <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      sessionStorage.setItem("theme", "dark"); // Save only for this tab
    } else {
      root.classList.remove("dark");
      sessionStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
 