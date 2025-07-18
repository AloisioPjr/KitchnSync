import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { fetchOrders } from "../../services/api";
import { ThemeContext } from "../../context/ThemeContext";
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
   const { isDark } = useContext(ThemeContext);
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

   return (
    <div
      className={`transition-all duration-300 h-full overflow-y-auto p-4 border-r ${
        isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
      } ${isDark ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-400"}`}
    >
      <div className="font-bold text-lg mb-4">TOTAL COUNT</div>

      {sortedSections.map((section) => (
        <div key={section} className="mb-4">
          <div className={`font-semibold mb-1 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
            {section}
          </div>
          <div className="space-y-1 pl-2">
            {Object.entries(allDayData[section]).map(([itemName, variants]) => (
              <div key={itemName}>
                <div className="font-medium">{itemName}</div>
                <div className={`text-sm pl-2 ${isDark ? "text-gray-300" : "text-gray-700"} space-y-1`}>
                  {Object.entries(variants).map(([variant, qty]) => (
                    <div key={variant}>
                      {variant && <span>{variant} &gt; </span>}
                     <span className={`${isDark ? "text-blue-400" : "text-blue-600"}`}>
  {qty.onHold} on hold
</span>,{" "}
<span className={`${isDark ? "text-green-400" : "text-green-600"}`}>
  {qty.away} away
</span>

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
