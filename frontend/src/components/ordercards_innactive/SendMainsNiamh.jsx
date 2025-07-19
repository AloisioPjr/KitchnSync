// components/ordercards/SendMainsNiamh.jsx
import React from "react";

const SendMainsNiamh = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-yellow-600 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 19:20</span>
          <span>⏳ 8</span>
          <span>🔄 19:50</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#201</span>
          <span>TBL: 4</span>
          <span>Niamh</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div className="line-through">1x Soup</div>
        <div className="line-through">1x Crab</div>
        <div className="line-through">1x Scotch Egg</div>
        <div className="line-through">1x Veggie Egg</div>
        <div className="line-through">1x Fish Plater</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>
          1x Striploin
          <div className="text-xs text-gray-300 ml-4">Rare</div>
        </div>
        <div>
          1x Striploin
          <div className="text-xs text-gray-300 ml-4">Medium Rare</div>
        </div>
        <div>
          1x Striploin
          <div className="text-xs text-gray-300 ml-4">Well Done</div>
        </div>
        <div>1x Haddock</div>
        <div>1x Duck</div>
        <div>1x Sole</div>
      </div>

     

      {/* Action Button */}
      <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-b-md">
        SEND MAINS
      </button>
    </div>
  );
};

export default SendMainsNiamh;
