// components/ordercards/OrderCardAnnaTbl8.jsx
import React from "react";

const OrderCardAnnaTbl8 = () => {
  return (
    <div className="w-60 rounded-md flex-shrink-0 overflow-hidden shadow-md text-white font-sans">
      {/* Header */}
      <div className="bg-green-600 p-2 flex flex-col items-center text-sm">
        <div className="flex justify-between w-full">
          <span>🕒 18:56</span>
          <span>⏳ 4</span>
          <span>🔄 18:56</span>
        </div>
        <div className="flex justify-between w-full font-bold">
          <span>#200</span>
          <span>TBL: 8</span>
          <span>Anna</span>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-gray-600 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">STARTERS</h4>
        <div>1x Soup</div>
        <div>1x Fish Plater</div>
      </div>

      {/* Mains */}
      <div className="bg-gray-700 p-2 border-t border-gray-600">
        <h4 className="text-center font-bold text-sm mb-1">MAINS</h4>
        <div>
          3x Duck
          <div className="text-xs text-gray-300 ml-4">1x Dairy Free</div>
        </div>
      </div>

      {/* No Desserts */}
      

      {/* Action Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-b-md">
        SEND STARTERS
      </button>
    </div>
  );
};

export default OrderCardAnnaTbl8;
