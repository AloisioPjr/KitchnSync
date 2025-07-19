import React from "react";

const CompletedCard = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-gray-500 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 18:45</span>
          <span>⏳ 0</span>
          <span>🔄 19:15</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#161</span>
          <span>TBL: 3</span>
          <span>Sean</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div className="line-through">1x Prawn Cocktail</div>
        <div className="line-through">1x Soup of the Day</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div className="line-through">
          2x Striploin
          <div className="text-xs text-gray-300 ml-4">Rare</div>
        </div>
        <div className="line-through">1x Haddock</div>
      </div>

      {/* Desserts */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">DESSERTS</h4>
        <div className="line-through">
          1x Chocolate Tart
          <div className="text-xs text-gray-200 ml-4">To Share</div>
        </div>
      </div>

      {/* Restart Order Button */}
      <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-b-md">
        RESTART ORDER
      </button>
    </div>
  );
};

export default CompletedCard;
