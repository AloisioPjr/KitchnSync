<<<<<<< HEAD
import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import { ThemeContext } from "../context/ThemeContext"; // ✅ import ThemeContext

const ToggleSwitch = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{label}</span>
    <label className="relative inline-block w-11 h-6">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onChange={onChange}
      />
=======
import React from "react";

const ToggleSwitch = ({ label }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{label}</span>
    <label className="relative inline-block w-11 h-6">
      <input type="checkbox" className="sr-only peer" />
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      <div className="absolute inset-0 bg-gray-600 peer-checked:bg-green-500 rounded-full transition-colors"></div>
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  </div>
);

const ColourGuide = () => (
  <div className="mt-6 border-t border-gray-600 pt-4">
    <h3 className="text-lg font-semibold mb-3">Colour Guide</h3>

<<<<<<< HEAD
=======
    {/* All Day Count Section */}
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    <div className="mb-4">
      <h4 className="text-md font-semibold mb-2 text-yellow-400">All Day Count</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
<<<<<<< HEAD
          <div className="w-4 h-4 bg-green-500 rounded-sm" /> <span>Fire</span>
=======
          <div className="w-4 h-4 bg-green-500 rounded-sm" /> <span>Away</span>
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm" /> <span>On Hold</span>
        </div>
      </div>
    </div>

<<<<<<< HEAD
=======
    {/* Order Cards View Section */}
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    <div>
      <h4 className="text-md font-semibold mb-2 text-yellow-400">Order Cards View</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-sm" /> <span>On Time (0–10 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-600 rounded-sm" /> <span>Nearly Late (10–15 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-700 rounded-sm" /> <span>Late (&gt;15 min)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-sm" /> <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black rounded-sm" /> <span>Cancelled</span>
        </div>
      </div>
    </div>
  </div>
);

<<<<<<< HEAD
const Settings = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const { isDark, setIsDark } = useContext(ThemeContext); // ✅ use theme context

  const toggleFilter = (key) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white font-sans dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>

      <div className="border-b border-gray-600 pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <ToggleSwitch
          label="Dark Theme"
          value={isDark}
          onChange={() => setIsDark(!isDark)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Order View Filters</h3>
        {Object.entries(filters)
          .filter(([key]) => key !== "Grill")
          .map(([key, value]) => (
            <ToggleSwitch
              key={key}
              label={`Show ${key}`}
              value={value}
              onChange={() => toggleFilter(key)}
            />
          ))}
      </div>

      <ColourGuide />
    </div>
  );
};
=======
const Settings = () => (
  <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white font-sans">
    <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>
    <div className="border-b border-gray-600 pb-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Theme</h3>
      <ToggleSwitch label="Dark Theme" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Order View Filters</h3>
      <ToggleSwitch label="Show Starters" />
      <ToggleSwitch label="Show Mains" />
      <ToggleSwitch label="Show Grill" />
      <ToggleSwitch label="Show Desserts" />
    </div>
    <ColourGuide />
  </div>
);
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe

export default Settings;
