// React and ThemeContext imports
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import theme context

const NavTab = ({ label, isSelected, onClick }) => {
  // Check if dark mode is active
  const { isDark } = useContext(ThemeContext);

  // Base style shared across all tabs
  const baseClasses = "relative px-5 py-2 rounded-full font-medium transition-all duration-300 border";

  // Style applied when tab is selected
  const selectedClasses = isDark
    ? "bg-gray-800 text-white border-gray-800"
    : "bg-gray-400 text-black border-gray-400";

  // Style applied when tab is unselected
  const unselectedClasses = isDark
    ? "text-gray-300 hover:text-white hover:bg-gray-700 border-transparent"
    : "text-gray-600 hover:text-black hover:bg-gray-400 border-transparent";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {label}
    </button>
  );
};

export default NavTab;
