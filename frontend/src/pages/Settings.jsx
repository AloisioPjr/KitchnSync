// React and context imports
import React, { useContext } from "react";

// Contexts for filters and theme toggle
import { FilterContext } from "../context/FilterContext";
import { ThemeContext } from "../context/ThemeContext";

// Reusable toggle switch component used for both theme and filter toggles
const ToggleSwitch = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{label}</span>
    <label className="relative inline-block w-11 h-6">
      <input
        type="checkbox"
        className="sr-only peer" // Hidden input for screen readers
        checked={value}
        onChange={onChange} // Trigger the passed toggle function
      />
      {/* Background bar that changes color when toggled */}
      <div className="absolute inset-0 bg-gray-600 peer-checked:bg-green-500 rounded-full transition-colors"></div>
      {/* Slider knob */}
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  </div>
);

// Static component showing colour legend for statuses and time delays
const ColourGuide = () => {
  const { isDark } = useContext(ThemeContext);

  // Helper for picking light/dark theme colors
  const bg = (light, dark) => (isDark ? dark : light);

  return (
    <div className="mt-6 border-t border-gray-600 pt-4">
      <h3 className="text-lg font-semibold mb-3">Colour Guide</h3>

      {/* Legend for All Day Count sidebar */}
      <div className="mb-4">
        <h4 className={`text-md font-semibold mb-2 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>All Day Count</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm" /> <span>Away</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm" /> <span>On Hold</span>
          </div>
        </div>
      </div>

      {/* Legend for colour meanings in the order cards */}
      <div>
        <h4 className={`text-md font-semibold mb-2 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>Order Cards View</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${bg("bg-green-200", "bg-green-600")}`} /> <span>On Time (0–10 min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${bg("bg-yellow-200", "bg-yellow-600")}`} /> <span>Nearly Late (10–15 min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${bg("bg-red-200", "bg-red-700")}`} /> <span>Late (&gt;15 min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${bg("bg-gray-200", "bg-gray-500")}`} /> <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${bg("bg-gray-300", "bg-black")}`} /> <span>Cancelled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-300 rounded-sm" /> <span>On Hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main settings page component where user can toggle theme and filter views
const Settings = () => {
  // Access current filters and setter from context
  const { filters, setFilters } = useContext(FilterContext);

  // Access dark mode flag and setter
  const { isDark, setIsDark } = useContext(ThemeContext);

  // Toggle individual course visibility filter
  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg font-sans ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>

      {/* Theme toggle switch */}
      <div className="border-b border-gray-600 pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <ToggleSwitch
          label="Dark Theme"
          value={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </div>

      {/* Course-type visibility filters */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Order View Filters</h3>
        {Object.entries(filters)
          .filter(([key]) => key !== "Grill") // Optionally exclude "Grill" from settings
          .map(([key, value]) => (
            <ToggleSwitch
              key={key}
              label={`Show ${key}`} // Label for each filter (e.g. "Show Mains")
              value={value}
              onChange={() => toggleFilter(key)}
            />
          ))}
      </div>

      {/* Reference guide for colour meanings */}
      <ColourGuide />
    </div>
  );
};

export default Settings;
