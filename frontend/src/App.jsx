<<<<<<< HEAD
// Global CSS styles
import './App.css';
// React core imports
import React, { useContext } from "react";

// Navigation bar component
import NavBar from "./components/navbar/navBar";

// View-related context provider and hook
import { ViewProvider, ViewContext } from "./context/ViewContext";

// Page components
=======
import './App.css'
import React, { useContext } from "react";
import NavBar from "./components/navbar/navBar";
import { ViewProvider, ViewContext } from "./context/ViewContext";
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
import AllOrders from "./pages/AllOrders"; 
import Away from "./pages/Away";
import OnHold from "./pages/OnHold";
import Completed from "./pages/Completed";
import Canceled from "./pages/Cancelled";
<<<<<<< HEAD

// Sidebar component for live item totals
import AllDayCount from "./components/alldaybar/AllDayCount";

// Sidebar visibility context
import { SidebarProvider, SidebarContext } from "./context/SidebarContext";

// Settings page
import Settings from "./pages/Settings"; 

// Filters for course-type toggles
import { FilterProvider } from "./context/FilterContext";

// Theme toggling support (e.g., dark/light mode)
import { ThemeProvider } from "./context/ThemeContext";

// Renders the currently selected view based on context
const ViewRenderer = () => {
  const { selectedView } = useContext(ViewContext); // Get current view tab from context

=======
import AllDayCount from "./components/alldaybar/AllDayCount";
import { SidebarProvider, SidebarContext } from "./context/SidebarContext";
import Settings from "./pages/Settings"; 

const ViewRenderer = () => {
  const { selectedView } = useContext(ViewContext);
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
  switch (selectedView) {
    case "All Orders":
      return <AllOrders />;
    case "Away":
      return <Away />;
    case "On Hold":
      return <OnHold />;
    case "Completed":
      return <Completed />;
<<<<<<< HEAD
    case "Cancelled":
=======
    case "Canceled":
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      return <Canceled />;
    case "Settings":                        
      return <Settings />;
    default:
<<<<<<< HEAD
      return <AllOrders />; // Fallback if unknown view
  }
};

// Layout container that includes the sidebar (AllDayCount) and main content
const MainContent = () => {
  const { isCollapsed } = useContext(SidebarContext); // Sidebar visibility toggle

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar transitions in/out smoothly */}
=======
      return <AllOrders />;
  }
};

const MainContent = () => {
  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div className="flex flex-1 overflow-hidden">
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      <div
        className={`transition-all duration-500 ${
          isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        } overflow-hidden`}
      >
        <AllDayCount />
      </div>
<<<<<<< HEAD

      {/* Main scrollable area for pages */}
=======
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      <main className="flex-1 overflow-y-auto p-4">
        <ViewRenderer />
      </main>
    </div>
  );
};

<<<<<<< HEAD
// Top-level application wrapper with all required providers
const App = () => (
  <ThemeProvider> {/* Provides dark/light mode styling context */}
    <ViewProvider> {/* Provides current tab/page view */}
      <SidebarProvider> {/* Controls sidebar toggle state */}
        <FilterProvider> {/* Provides item/course filters to pages */}
          {/* Main layout: vertical flex container with theme-aware styling */}
          <div className="flex flex-col h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <NavBar /> {/* Top navigation bar */}
            <MainContent /> {/* Page content with optional sidebar */}
          </div>
        </FilterProvider>
      </SidebarProvider>
    </ViewProvider>
  </ThemeProvider>
);

// Export root component
=======
const App = () => (
  <ViewProvider>
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <NavBar />
        <MainContent />
      </div>
    </SidebarProvider>
  </ViewProvider>
);

>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
export default App;
