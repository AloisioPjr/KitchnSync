<<<<<<< HEAD
// React imports for creating context and managing state
import React, { createContext, useState } from "react";

// Create the SidebarContext to share sidebar state across components
export const SidebarContext = createContext();

// Provider component that wraps parts of the app needing sidebar state
export const SidebarProvider = ({ children }) => {
  // State to track whether the sidebar is collapsed (hidden) or expanded
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle function to switch sidebar visibility
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    // Pass down the current collapsed state and toggle function to any component that uses the context
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children} {/* Render children inside the context */}
=======
import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    </SidebarContext.Provider>
  );
};
