// React core and context imports
import React, { useContext } from "react";

// Import course-type filters from shared context
import { FilterContext } from "../context/FilterContext";

// Custom hook to receive real-time "completed" orders via WebSocket
import useOrderSocket from "../components/orders/useOrderSocket";

// Component to display a scrollable grid of order cards
import OrderGrid from "../components/orders/OrderGrid";

// Completed component: shows all orders that have finished all courses
const Completed = () => {
  // Get the course filters (e.g., Starters, Mains) from settings
  const { filters } = useContext(FilterContext);

  // Subscribe to real-time updates for orders with status "completed"
  const orders = useOrderSocket("completed", filters);

  // Render the completed orders in a horizontal grid layout
  return <OrderGrid orders={orders} />;
};

export default Completed;
