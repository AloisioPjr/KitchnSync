<<<<<<< HEAD
// React imports
import React, { useContext, useEffect, useState } from "react";

// Navigation tab component
import NavTab from "./navTab";

// Contexts for handling the current view and sidebar toggling
import { ViewContext } from "../../context/ViewContext";
import { SidebarContext } from "../../context/SidebarContext";

// Define tab labels shown in the navbar
const tabs = ["All Orders", "Away", "On Hold", "Completed", "Cancelled"];

// Main navigation bar component
const NavBar = () => {
  // Destructure context values for view selection and search query
  const { selectedView, setSelectedView, searchQuery, setSearchQuery } = useContext(ViewContext);

  // Sidebar toggle function from SidebarContext
  const { toggleSidebar } = useContext(SidebarContext);

  // Local state to show the current time
=======
import React, { useContext, useEffect, useState } from "react";
import NavTab from "./navTab";
import { ViewContext } from "../../context/ViewContext";
import { SidebarContext } from "../../context/SidebarContext";

const tabs = ["All Orders", "Away", "On Hold", "Completed", "Canceled"];

const NavBar = () => {
  const { selectedView, setSelectedView } = useContext(ViewContext);
  const { toggleSidebar } = useContext(SidebarContext);
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

<<<<<<< HEAD
  // Update the time every second
=======
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
<<<<<<< HEAD

    // Cleanup the timer on unmount
=======
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 bg-gradient-to-b from-gray-500 to-gray-700 shadow-md">
<<<<<<< HEAD
      {/* Left section: sidebar toggle + tab buttons */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button (hamburger) */}
=======
      <div className="flex items-center gap-4">
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl px-3 py-1 hover:bg-gray-700 rounded"
        >
          ≡
        </button>
<<<<<<< HEAD

        {/* Render tab buttons */}
=======
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
        {tabs.map((tab) => (
          <NavTab
            key={tab}
            label={tab}
            isSelected={selectedView === tab}
            onClick={() => setSelectedView(tab)}
          />
        ))}
      </div>
<<<<<<< HEAD

      {/* Right section: search bar + time + settings button */}
      <div className="flex items-center gap-4">
        {/* Only show search bar when in "All Orders" view */}
        {selectedView === "All Orders" && (
          <input
            type="text"
            placeholder="Search Ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query in context
            className="bg-gray-800 text-white px-3 py-1 rounded-md outline-none"
          />
        )}

        {/* Clock and settings button */}
        <div className="flex items-center gap-2">
          {/* Current time */}
          <span className="text-sm font-mono">{currentTime}</span>

          {/* Settings button (⚙️) */}
          <button
            className={`text-lg p-2 rounded transition-all ${
              selectedView === "Settings" ? "bg-gray-800" : "hover:bg-gray-700"
=======
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search Ticket..."
          className="bg-gray-800 text-white px-3 py-1 rounded-md outline-none"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">19:00</span>
          <button
            className={`text-lg p-2 rounded transition-all ${
              selectedView === "Settings"
                ? "bg-gray-800"
                : "hover:bg-gray-700"
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
            }`}
            title="Settings"
            onClick={() => setSelectedView("Settings")}
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
