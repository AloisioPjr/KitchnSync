// Core React and context hook
import React, { useContext } from "react";

// Context providing filter settings for course types (e.g., Starters, Mains)
import { FilterContext } from "../context/FilterContext";

// Custom hook to listen for real-time order updates via WebSocket
import useOrderSocket from "../components/orders/useOrderSocket";

// Component to render the grid of order cards
import OrderGrid from "../components/orders/OrderGrid";

// Away component displays all orders that are currently marked as "away"
const Away = () => {
  // Get the active course-type filters (from Settings)
  const { filters } = useContext(FilterContext);

  // Fetch orders with status "away", filtered by course types
  const orders = useOrderSocket("away", filters);

  // Render the filtered away orders using the OrderGrid layout
  return <OrderGrid orders={orders} />;
};

export default Away;
