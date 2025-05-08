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
    </button>
  );
};

export default NavTab;

