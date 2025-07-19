// components/ordercards/CompletedCardsBatch.jsx
import React from "react";

const createCard = (orderNumber, table, waitress, time, starters, mains, desserts) => (
  <div key={orderNumber} className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
    {/* Header */}
    <div className="bg-gray-500 p-2 flex flex-col items-center text-sm">
      <div className="flex justify-between w-full">
        <span>🕒 {time}</span>
        <span>⏳ 0</span>
        <span>🔄 20:15</span>
      </div>
      <div className="flex justify-between w-full font-bold">
        <span>#{orderNumber}</span>
        <span>TBL: {table}</span>
        <span>{waitress}</span>
      </div>
    </div>

    {/* Starters */}
    <div className="bg-gray-700 p-2 border-t border-gray-600">
      <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
      {starters.map((item, i) => (
        <div key={i} className="line-through">1x {item}</div>
      ))}
    </div>

    {/* Mains */}
    <div className="bg-gray-700 p-2 border-t border-gray-600">
      <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
      {mains.map((item, i) => (
        <div key={i} className="line-through">1x {item}</div>
      ))}
    </div>

    {/* Desserts */}
    <div className="bg-gray-700 p-2 border-t border-gray-600">
      <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
      {desserts.map((item, i) => (
        <div key={i} className="line-through">1x {item}</div>
      ))}
    </div>

    {/* Restart Button */}
    <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-b-md">
      RESTART ORDER
    </button>
  </div>
);

export const CompletedCards = [
  createCard("200", "4", "Anna", "19:50", ["Soup", "Fish Plater"], ["Duck"], ["Choc Tart"]),
  createCard("201", "1", "Pedro", "19:45", ["Prawn Cocktail"], ["Striploin", "Sole"], ["Brownie"]),
  createCard("202", "11", "Aisling", "19:40", ["Bruschetta", "Soup"], ["Haddock"], ["B&B Pudding", "Cheese"]),
  createCard("203", "8", "Tom", "19:35", ["Soup", "Burrata"], ["Chicken Supreme", "Duck"], ["Ice Cream"]),
  createCard("204", "6", "Sarah", "19:30", ["Scotch Egg"], ["Sole"], ["Choc Tart"]),
  createCard("205", "3", "Sean", "19:25", ["Veggie Egg", "Fish Plater"], ["Striploin Rare"], ["Cheese"]),
  createCard("206", "7", "Mary", "19:20", ["Soup"], ["Striploin Medium", "Haddock"], ["Brownie"])
];
