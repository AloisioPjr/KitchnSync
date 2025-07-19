// React and context imports
import React, { useContext, useEffect, useState } from "react";
import NavTab from "./navTab";

// Application-level context for view selection and search input
import { ViewContext } from "../../context/ViewContext";

// Sidebar toggle control
import { SidebarContext } from "../../context/SidebarContext";

// Dark/light theme context
import { ThemeContext } from "../../context/ThemeContext";

// Navigation tab names
const tabs = ["All Orders", "Away", "On Hold", "Completed", "Cancelled"];

// Main navigation bar component
const NavBar = () => {
  // Get the current view and search query from shared context
  const { selectedView, setSelectedView, searchQuery, setSearchQuery } = useContext(ViewContext);

  // Sidebar toggle function from context
  const { toggleSidebar } = useContext(SidebarContext);

  // Dark mode state from theme context
  const { isDark } = useContext(ThemeContext);

  // Local state to hold the live-updating clock time
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );

  // Update the currentTime every second to reflect the real clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`w-full flex justify-between items-center px-4 py-2 shadow-md transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-gray-500 to-gray-700 text-white"
          : "bg-gradient-to-b from-gray-300 to-gray-500 text-white"
      }`}
    >
      {/* Left section: sidebar toggle and view tabs */}
      <div className="flex items-center gap-4">
        {/* Button to toggle AllDayCount sidebar */}
        <button
          onClick={toggleSidebar}
          className={`text-2xl px-3 py-1 rounded ${
            isDark ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-300"
          }`}
        >
          ☰
        </button>

        {/* Tab buttons: All Orders, Away, On Hold, Completed, Cancelled */}
        {tabs.map((tab) => (
          <NavTab
            key={tab}
            label={tab}
            isSelected={selectedView === tab}
            onClick={() => setSelectedView(tab)}
          />
        ))}
      </div>

      {/* Right section: search bar, clock, and settings button */}
      <div className="flex items-center gap-4">
        {/* Search bar only shows in "All Orders" view */}
        {selectedView === "All Orders" && (
          <input
            type="text"
            placeholder="Search Ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-3 py-1 rounded-md outline-none transition-colors duration-200 ${
              isDark
                ? "bg-gray-800 text-white placeholder-gray-400"
                : "bg-white text-black placeholder-gray-500 border border-gray-300"
            }`}
          />
        )}

        {/* Clock + Settings icon */}
        <div className="flex items-center gap-2">
          {/* Display the live current time */}
          <span className="text-sm font-mono">{currentTime}</span>

          {/* Button to open Settings view */}
          <button
            title="Settings"
            onClick={() => setSelectedView("Settings")}
            className={`text-lg p-2 rounded transition-all ${
              isDark
                ? selectedView === "Settings"
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-700 text-white"
                : selectedView === "Settings"
                ? "bg-gray-300 text-black"
                : "hover:bg-gray-200 text-black"
            }`}
          >
            ⛯
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
