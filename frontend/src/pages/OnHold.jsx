// Core React and context API
import React, { useContext } from "react";

// Shared context that provides filter settings for course types
import { FilterContext } from "../context/FilterContext";

// Custom hook for receiving real-time "on hold" orders
import useOrderSocket from "../components/orders/useOrderSocket";

// Component responsible for displaying orders in a tiled grid
import OrderGrid from "../components/orders/OrderGrid";

// OnHold component: displays all orders currently "on hold"
const OnHold = () => {
  // Retrieve course-type filters from global context (Settings)
  const { filters } = useContext(FilterContext);

  // Fetch "on hold" orders, applying active filters
  const orders = useOrderSocket("on hold", filters);

  // Render the filtered list in a scrollable grid view
  return <OrderGrid orders={orders} />;
};

export default OnHold;
