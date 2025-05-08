import React from "react";

const SendMains = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-yellow-600 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 18:15</span>
          <span>⏳ 10</span>
          <span>🔄 18:50</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#199</span>
          <span>TBL: B2</span>
          <span>Anna</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div className="line-through">1x Crab</div>
        <div className="line-through">
          1x Scotch Egg
          <div className="text-xs text-gray-300 ml-4">No Better</div>
        </div>
      </div>

      {/* Mains */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>
          1x Haddock
          <div className="text-xs text-gray-300 ml-4">With Chips</div>
        </div>
        <div>1x Sole</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div>1x Brownie</div>
        <div>1x B&amp;B Pudding</div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-b-md">
        SEND MAINS
      </button>
    </div>
  );
};

export default SendMains;
