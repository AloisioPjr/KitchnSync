// React core import
import React from "react";

// Import component that renders individual order tiles
import OrderCard from "./OrderCard";

// Determine urgency level: 0 = on time, 1 = nearly late, 2 = late, 3 = others
const getUrgencyLevel = (order) => {
  const timeRef = order.calledAwayAt || order.createdAt;
  const diffMins = Math.floor((Date.now() - new Date(timeRef)) / 60000);

  if (order.status === "away") {
    if (diffMins < 10) return 2; // late
    if (diffMins < 15) return 1; // nearly late
    return 0; // on time
  }

  if (order.status === "on hold") return 3;     // On Hold
  if (order.status === "completed") return 4;   // Completed
  if (order.status === "cancelled") return 5;   // Cancelled

  return 6; // fallback if unexpected status
};

// Component: OrderGrid
// Purpose: lays out order cards in a horizontal scrollable grid
const OrderGrid = ({ orders }) => {
  // Sort orders by urgency level
  const sortedOrders = [...orders].sort((a, b) => {
    const levelA = getUrgencyLevel(a);
    const levelB = getUrgencyLevel(b);
    return levelA - levelB; // lower level = higher priority (left side)
  });

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Scrollable grid: 3 fixed rows, infinite columns */}
      <div className="grid grid-rows-3 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {/* Render each order using OrderCard */}
        {sortedOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderGrid;
