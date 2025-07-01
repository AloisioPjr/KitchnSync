// React imports for creating context, managing state, and using effects
import React, { createContext, useEffect, useState } from "react";

// Create the context to hold filter state for course types
export const FilterContext = createContext();

// Provider component to wrap parts of the app that need access to filters
export const FilterProvider = ({ children }) => {
  // Initialize filter state
  const [filters, setFilters] = useState(() => {
    // Attempt to restore previous filter settings from sessionStorage
    const stored = sessionStorage.getItem("kds-filters");
    return stored
      ? JSON.parse(stored) // Use stored filters if they exist
      : {
          Starters: true,
          Mains: true,
          Desserts: true,
        }; // Default: all enabled
  });

  // Side effect: save current filters to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("kds-filters", JSON.stringify(filters));
  }, [filters]);

  return (
    // Provide the filter state and update function to all children components
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children} {/* Render the nested children inside the filter context */}
    </FilterContext.Provider>
  );
};
