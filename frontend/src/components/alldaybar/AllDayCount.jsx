<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { fetchOrders } from "../../services/api";

// Groups order items by course type (e.g. Starters) and course status (on hold or away)
const groupItemsByCourseTypeAndCourseStatus = (orders) => {
  const result = {};

  orders.forEach((order) => {
    order.courses.forEach((course) => {
      const { status: courseStatus, type: courseType, items } = course;

      // Skip courses that are not on hold or away
      if (!["on hold", "away"].includes(courseStatus)) return;

      // Initialize course type category if it doesn't exist
      if (!result[courseType]) result[courseType] = {};

      items.forEach(({ name, quantity, comment = "" }) => {
        const variant = comment.trim() || ""; // Use comment as variant key
        if (!result[courseType][name]) result[courseType][name] = {};
        if (!result[courseType][name][variant])
          result[courseType][name][variant] = { onHold: 0, away: 0 };

        // Increment either onHold or away quantity based on course status
        result[courseType][name][variant][
          courseStatus === "on hold" ? "onHold" : "away"
        ] += quantity;
      });
    });
  });

  return result; // Return structured summary object
};

// Optional sorting by visual section order
const courseTypeOrder = ["Starters", "Mains", "Desserts"]; // Define the order of course types for display

const AllDayCount = () => {
  const { isCollapsed } = useContext(SidebarContext); // Sidebar visibility control
  const [allDayData, setAllDayData] = useState({}); // State to hold grouped data

  // Fetch and group order data on mount and every second
  useEffect(() => { 
    const fetchData = async () => { // Fetch orders from API
      try {
        const orders = await fetchOrders(); // Get all orders from API
        const grouped = groupItemsByCourseTypeAndCourseStatus(orders); // Group them
        setAllDayData(grouped); // Update state with grouped data
      } catch (err) {// Handle any errors during fetch
        console.error("Failed to fetch orders:", err); // Log error if fetch fails
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Refresh data every second
    return () => clearInterval(interval);// Cleanup interval on unmount
  }, []);

  // Filter course types by those present in data
  const sortedSections = courseTypeOrder.filter((key) =>
    allDayData.hasOwnProperty(key)
  );
=======
import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const mockData = {
  Starters: {
    "Soup of the Day": { "": { onHold: 3, away: 1 } },
    "Prawn Cocktail": { "": { onHold: 2, away: 4 } },
  },
  Mains: {
    Striploin: {
      Rare: { onHold: 1, away: 2 },
      Medium: { onHold: 0, away: 3 },
    },
    Haddock: {
      "With Chips": { onHold: 0, away: 1 },
    },
  },
  Desserts: {
    "Chocolate Tart": {
      "To Share": { onHold: 1, away: 0 },
    },
  },
};

const AllDayCount = () => {
  const { isCollapsed } = useContext(SidebarContext);
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 h-full overflow-y-auto p-4 border-r border-gray-700 ${
        isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
      }`}
    >
<<<<<<< HEAD
      <div className="font-bold text-lg mb-4">TOTAL COUNT</div>
      {/* Iterate through each section (e.g., Starters, Mains) */}

      {sortedSections.map((section) => (
        <div key={section} className="mb-4">
          {/* Section heading (e.g., Starters) */}
          <div className="font-semibold text-yellow-400 mb-1">{section}</div>
          <div className="space-y-1 pl-2">
            {Object.entries(allDayData[section]).map(([itemName, variants]) => (
              <div key={itemName}>
                {/* Item name (e.g., Striploin) */}
=======
      <div className="font-bold text-lg mb-4">ALLDAY COUNT</div>

      {Object.entries(mockData).map(([section, items]) => (
        <div key={section} className="mb-4">
          <div className="font-semibold text-yellow-400 mb-1">{section}</div>
          <div className="space-y-1 pl-2">
            {Object.entries(items).map(([itemName, variants]) => (
              <div key={itemName}>
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
                <div className="font-medium">{itemName}</div>
                <div className="text-sm pl-2 text-gray-300 space-y-1">
                  {Object.entries(variants).map(([variant, qty]) => (
                    <div key={variant}>
<<<<<<< HEAD
                      {/* Optional label (e.g., Rare, Extra Spicy) */}
                      {variant && <span>{variant} &gt; </span>}
                      {/* Show on hold count in blue */}
                      <span className="text-blue-400">
                        {qty.onHold} on hold
                      </span>
                      ,{" "}
                      {/* Show away count in green */}
                      <span className="text-green-400">
                        {qty.away} away
                      </span>
=======
                      {variant && <span>{variant} &gt; </span>}
                      <span className="text-green-400">{qty.onHold} </span>,{" "}
                      <span className="text-blue-400">{qty.away}</span>
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDayCount;
