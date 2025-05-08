import React, { useContext, useEffect, useState } from "react";
import NavTab from "./navTab";
import { ViewContext } from "../../context/ViewContext";
import { SidebarContext } from "../../context/SidebarContext";

const tabs = ["All Orders", "Away", "On Hold", "Completed", "Canceled"];

const NavBar = () => {
  const { selectedView, setSelectedView } = useContext(ViewContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-4 py-2 bg-gradient-to-b from-gray-500 to-gray-700 shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl px-3 py-1 hover:bg-gray-700 rounded"
        >
          ≡
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
