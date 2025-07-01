<<<<<<< HEAD
// React import for component creation
import React from "react";

// NavTab component: renders an individual tab button
const NavTab = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick} // Trigger callback to change selected tab
      className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 border
        ${
          isSelected
            ? "bg-gray-800 text-white border-gray-800" // Style for the active tab
            : "text-gray-300 hover:text-white hover:bg-gray-700 border-transparent" // Style for inactive tab
        }`}
    >
      {label} {/* Display the tab name (e.g. "All Orders") */}
=======
import React from "react";

const NavTab = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 border
        ${
          isSelected
            ? "bg-gray-800 text-white border-gray-800"
            : "text-gray-300 hover:text-white hover:bg-gray-700 border-transparent"
        }`}
    >
      {label}
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
    </button>
  );
};

<<<<<<< HEAD
export default NavTab; // Export for use in NavBar
=======
export default NavTab;

>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
