// React imports for context, state, and side effects
import React, { createContext, useState, useEffect } from "react";

// Create a context to manage and share theme state across the app
export const ThemeContext = createContext();

// Context provider component to wrap the app and provide theme control
export const ThemeProvider = ({ children }) => {
  // State to track whether dark mode is enabled
  const [isDark, setIsDark] = useState(() => {
    // Load theme preference from localStorage, default to dark mode if not set
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === null;
  });

  // Effect: applies or removes the "dark" class to <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement; // Reference to <html> element
    if (isDark) {
      root.classList.add("dark"); // Enables TailwindCSS dark mode styles
      localStorage.setItem("theme", "dark"); // Persist choice
    } else {
      root.classList.remove("dark"); // Disable dark mode styles
      localStorage.setItem("theme", "light"); // Persist choice
    }
  }, [isDark]);

  return (
    // Provide `isDark` state and the `setIsDark` updater to all children
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children} {/* Render the nested app inside the context */}
    </ThemeContext.Provider>
  );
};
