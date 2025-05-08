import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const mockData = {
  Starters: {
    "Soup of the Day": { "": { onHold: 3, away: 1 } },
    "Prawn Cocktail": { "": { onHold: 2, away: 4 } },
  },
  Mains: {
    Striploin: {
      Rare: { onHold: 1, away: 2 },
      Medium: { onHold: 0, away: 3 },
    },
    Haddock: {
      "With Chips": { onHold: 0, away: 1 },
    },
  },
  Desserts: {
    "Chocolate Tart": {
      "To Share": { onHold: 1, away: 0 },
    },
  },
};

const AllDayCount = () => {
  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 h-full overflow-y-auto p-4 border-r border-gray-700 ${
        isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
      }`}
    >
      <div className="font-bold text-lg mb-4">ALLDAY COUNT</div>

      {Object.entries(mockData).map(([section, items]) => (
        <div key={section} className="mb-4">
          <div className="font-semibold text-yellow-400 mb-1">{section}</div>
          <div className="space-y-1 pl-2">
            {Object.entries(items).map(([itemName, variants]) => (
              <div key={itemName}>
                <div className="font-medium">{itemName}</div>
                <div className="text-sm pl-2 text-gray-300 space-y-1">
                  {Object.entries(variants).map(([variant, qty]) => (
                    <div key={variant}>
                      {variant && <span>{variant} &gt; </span>}
                      <span className="text-green-400">{qty.onHold} </span>,{" "}
                      <span className="text-blue-400">{qty.away}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDayCount;
