<<<<<<< HEAD
// React core imports
import React, { useEffect, useState, useContext } from "react";
// Socket for real-time communication
import socket from "../services/socket";
// Context to get the course type filters from settings
import { FilterContext } from "../context/FilterContext";

// Utility: maps course status to a background colour
const getCourseBackground = (status) => {
  switch (status) {
    case "away":
      return "bg-gray-600";
    case "on hold":
      return "bg-gray-900";
    case "completed":
      return "bg-gray-800";
    case "cancelled":
      return "bg-black";
    default:
      return "bg-gray-800";
  }
};

// Component to render a single cancelled order card
const OrderCard = ({ order }) => {
  const headerColor = "bg-black"; // Fixed dark header for cancelled orders

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex flex-col justify-between">
      <div>
        {/* Header: displays order number, table, and waiter */}
        <div className={`text-white text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          #{order.orderNumber} | Table {order.tableNumber} | {order.waiter}
        </div>

        {/* Courses and items display */}
        <div className="text-gray-300 text-sm space-y-2">
          {order.courses.map((course, idx) => (
            <div key={idx} className={`p-2 rounded ${getCourseBackground(course.status)}`}>
              <div className="font-semibold text-yellow-300">{course.type}</div>
              {course.items.map((item, index) => (
                <div key={index} className="ml-2">
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  {/* Display item comment if available */}
                  {item.comment && (
                    <div className="text-xs italic text-gray-400">“{item.comment}”</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Page component to render all cancelled orders
const Cancelled = () => {
  const [orders, setOrders] = useState([]); // Holds list of filtered cancelled orders
  const { filters } = useContext(FilterContext); // Access active course filters

  // Fetch data and set up real-time updates
  useEffect(() => {
    const fetchInitial = () => socket.emit("requestOrders"); // Request data from backend

    fetchInitial(); // Initial fetch on mount
    const interval = setInterval(fetchInitial, 1000); // Refresh every second

    // Handle the initial set of orders returned by the server
    const handleInitial = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "cancelled" && // Only cancelled orders
          o.courses.some((course) => filters[course.type]) // Match at least one active filter
      );
      setOrders(filtered); // Store in state
    };

    // Handle updates when orders are changed by other clients or actions
    const handleUpdate = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "cancelled" &&
          o.courses.some((course) => filters[course.type])
      );
      setOrders(filtered); // Update state
    };

    // Listen to relevant socket events
    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    // Clean up listeners and interval when component unmounts
    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [filters]); // Rerun this effect when filters change

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Horizontally scrolling grid of cancelled order cards */}
      <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
=======
import React from 'react';
import CancelledCard from '../components/ordercards/CancelledCard';
const Cancelled = () => {
  return (
    <div>
      
      <div className="flex gap-4 overflow-x-auto p-4">
        <CancelledCard />
        
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      </div>
    </div>
  );
};

export default Cancelled;
