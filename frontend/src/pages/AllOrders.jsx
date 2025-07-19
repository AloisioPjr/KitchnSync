// React and context imports
import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import { ViewContext } from "../context/ViewContext";

// Custom hook to receive real-time orders via socket
import useOrderSocket from "../components/orders/useOrderSocket";

// Component to render a grid of order cards
import OrderGrid from "../components/orders/OrderGrid";

const AllOrders = () => {
  // Get active course-type filters from settings
  const { filters } = useContext(FilterContext);

  // Get current search query entered by user
  const { searchQuery } = useContext(ViewContext);

  // Fetch all orders in real-time (no status filter, gets all: on hold, away, completed, cancelled)
  const orders = useOrderSocket(null, filters);

  // Apply search filter to orders
  const filteredOrders = orders.filter(order => {
    const q = searchQuery.trim().toLowerCase(); // Normalize the search query
    return (
      q === "" || // If search query is empty, include everything
      order.orderNumber.toLowerCase().includes(q) ||
      order.tableNumber.toLowerCase().includes(q) ||
      order.waiter.toLowerCase().includes(q) ||
      // Also search within course types and item names/comments
      order.courses.some(course =>
        course.type.toLowerCase().includes(q) ||
        course.items.some(item =>
          item.name.toLowerCase().includes(q) ||
          (item.comment && item.comment.toLowerCase().includes(q))
        )
      )
    );
  });

  // Render grid of filtered orders
  return <OrderGrid orders={filteredOrders} />;
};

export default AllOrders;
