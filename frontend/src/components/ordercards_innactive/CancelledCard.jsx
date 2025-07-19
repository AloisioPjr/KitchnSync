import React from "react";

const CancelledCard = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-black p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 18:40</span>
          <span>⏳ 0</span>
          <span>🔄 19:10</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#158</span>
          <span>TBL: TW6</span>
          <span>Mary</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div className="line-through">1x Bruschetta</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div className="line-through">1x Chicken Supreme</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div className="line-through">1x Ice Cream</div>
      </div>

      {/* Restart Order Button */}
      <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 rounded-b-md">
        RESTART ORDER
      </button>
    </div>
  );
};

export default CancelledCard;
