import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import theme context

const NavTab = ({ label, isSelected, onClick }) => {
  const { isDark } = useContext(ThemeContext); // Use dark mode flag

  const baseClasses = "relative px-5 py-2 rounded-full font-medium transition-all duration-300 border";

  const selectedClasses = isDark
    ? "bg-gray-800 text-white border-gray-800"
    : "bg-gray-400 text-black border-gray-400";

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
