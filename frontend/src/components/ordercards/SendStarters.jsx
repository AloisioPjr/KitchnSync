import React from "react";

const SendStarters = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 shadow-md font-sans">
      {/* Header */}
      <div className="bg-red-700 p-2 flex flex-col items-center text-sm rounded-t-md">
        <div className="flex justify-between w-full">
          <span>🕒 18:45</span>
          <span>⏳ 15</span>
          <span>🔄 18:45</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#188</span>
          <span>TBL: 5</span>
          <span>Niamh</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div>
          1x Prawn Cocktail
          <div className="text-xs text-gray-300 ml-4">No Sauce</div>
        </div>
        <div>1x Soup of the Day</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>1x Chicken Supreme</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div>1x Ice Cream</div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-b-md">
        SEND STARTERS
      </button>
    </div>
  );
};

export default SendStarters;
