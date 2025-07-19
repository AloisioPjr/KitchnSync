// components/ordercards/CancelledCardsBatch.jsx
import React from "react";

const createCancelledCard = (orderNumber, table, waitress, time, starters, mains, desserts) => (
  <div key={orderNumber} className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
    {/* Header */}
    <div className="bg-black p-2 flex flex-col items-center text-sm">
      <div className="flex justify-between w-full">
        <span>🕒 {time}</span>
        <span>⏳ 0</span>
        <span>🔄 20:10</span>
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
    <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 rounded-b-md">
      RESTART ORDER
    </button>
  </div>
);

export const CancelledCards = [
  createCancelledCard("207", "12", "Sinead", "19:15", ["Soup"], ["Chicken Supreme"], ["Ice Cream"]),
  createCancelledCard("208", "15", "Liam", "19:25", ["Bruschetta", "Crab"], ["Striploin"], ["Brownie", "Cheese"]),
  createCancelledCard("209", "13", "Grace", "19:35", ["Fish Plater"], ["Duck", "Haddock"], ["Choc Tart"])
];
