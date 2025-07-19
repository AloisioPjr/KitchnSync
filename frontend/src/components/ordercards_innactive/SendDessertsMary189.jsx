// components/ordercards/SendDessertsMary189.jsx
import React from "react";

const SendDessertsMary189 = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-red-700 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 19:10</span>
          <span>⏳ 20</span>
          <span>🔄 19:30</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#189</span>
          <span>TBL: 6</span>
          <span>Mary</span>
        </div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>2x Haddock</div>
        <div>2x Sole</div>
        <div>1x Duck</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div>3x B&amp;B Pudding</div>
        <div>1x Cheese</div>
        <div>1x Chocolate Tart</div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-b-md">
        SEND DESSERTS
      </button>
    </div>
  );
};

export default SendDessertsMary189;
