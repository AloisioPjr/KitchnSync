// React and context imports
import React, { useContext } from "react";

// Import filter settings from global context
import { FilterContext } from "../context/FilterContext";

// Custom hook for receiving real-time order updates via WebSocket
import useOrderSocket from "../components/orders/useOrderSocket";

// Component that lays out the order cards in a grid
import OrderGrid from "../components/orders/OrderGrid";

// Cancelled component: shows all orders that have been cancelled
const Cancelled = () => {
  // Access current course-type filters from settings
  const { filters } = useContext(FilterContext);

  // Fetch and subscribe to "cancelled" orders filtered by course types
  const orders = useOrderSocket("cancelled", filters);

  // Display the cancelled orders in a responsive grid layout
  return <OrderGrid orders={orders} />;
};

export default Cancelled;
