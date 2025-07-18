import React, { useContext, useEffect, useState } from "react";
import NavTab from "./navTab";
import { ViewContext } from "../../context/ViewContext";
import { SidebarContext } from "../../context/SidebarContext";
import { ThemeContext } from "../../context/ThemeContext"; // ⬅️ Theme support added

const tabs = ["All Orders", "Away", "On Hold", "Completed", "Cancelled"];

const NavBar = () => {
  const { selectedView, setSelectedView, searchQuery, setSearchQuery } = useContext(ViewContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { isDark } = useContext(ThemeContext); // ⬅️ Get theme

  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    }, 1000);

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
      {/* Left: Sidebar toggle + tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`text-2xl px-3 py-1 rounded ${
            isDark ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-300"
          }`}
        >
          ☰
        </button>

        {tabs.map((tab) => (
          <NavTab
            key={tab}
            label={tab}
            isSelected={selectedView === tab}
            onClick={() => setSelectedView(tab)}
          />
        ))}
      </div>

      {/* Right: Search bar, clock, settings */}
      <div className="flex items-center gap-4">
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

        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{currentTime}</span>
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
