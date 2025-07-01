<<<<<<< HEAD
// React imports
import React, { createContext, useState } from "react";

// Create a context for managing current view (e.g. tab) and search query
export const ViewContext = createContext();

// Context provider component
export const ViewProvider = ({ children }) => {
  // State for tracking which tab/view is selected (e.g. "All Orders", "Away", etc.)
  const [selectedView, setSelectedView] = useState("All Orders");

  // State for tracking the current text in the search bar
  const [searchQuery, setSearchQuery] = useState(""); // New addition for search

  // Provide both states and their setters to the consuming components
  return (
    <ViewContext.Provider value={{ selectedView, setSelectedView, searchQuery, setSearchQuery }}>
      {children} {/* Render all child components inside the context */}
=======
import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState("All Orders");

  return (
    <ViewContext.Provider value={{ selectedView, setSelectedView }}>
      {children}
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    </ViewContext.Provider>
  );
};
