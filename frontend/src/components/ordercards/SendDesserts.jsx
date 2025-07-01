import React from "react";

const SendDesserts = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-green-600 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 18:00</span>
          <span>⏳ 2</span>
          <span>🔄 18:58</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#156</span>
          <span>TBL: 1</span>
          <span>Pedro</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div className="line-through">1x Soup</div>
        <div className="line-through">1x Burrata</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>
          <span className="line-through">1x Striploin</span>
          <div className="line-through text-xs text-gray-300 ml-4">Medium</div>
        </div>
        <div className="line-through">1x Cod</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div>
          <span>1x Choc Tart</span>
          <div className="text-xs text-gray-200 ml-4">To Share</div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-b-md">
        SEND DESSERTS
      </button>
    </div>
  );
};

export default SendDesserts;
