<<<<<<< HEAD
// React and hooks
import React, { useEffect, useState, useContext } from "react";
// Socket for real-time updates
import socket from "../services/socket";
// Context for filter settings from Settings page
import { FilterContext } from "../context/FilterContext";

// Utility: get background colour for a course based on its status
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

// Component: displays one order that is completed
const OrderCard = ({ order }) => {
  const headerColor = "bg-gray-500"; // Static grey header for completed orders

  // Handler to restart a completed order (sets first course to away, rest on hold)
  const handleRestartOrder = () => {
    const updatedCourses = order.courses.map((course, index) =>
      index === 0
        ? { ...course, status: "away" } // First course is fired again
        : { ...course, status: "on hold" } // Others go back to hold
    );

    const updatedOrder = {
      ...order,
      status: "away",
      calledAwayAt: new Date(), // Update the away timestamp
      courses: updatedCourses,
    };

    // Send updated order back through socket to server
    socket.emit("updateOrder", updatedOrder);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex flex-col justify-between">
      <div>
        {/* Order header: order number, table, and waiter */}
        <div className={`text-white text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          #{order.orderNumber} | Table {order.tableNumber} | {order.waiter}
        </div>

        {/* Course and items listing */}
        <div className="text-gray-300 text-sm space-y-2">
          {order.courses.map((course, idx) => (
            <div key={idx} className={`p-2 rounded ${getCourseBackground(course.status)}`}>
              <div className="font-semibold text-yellow-300">{course.type}</div>
              {course.items.map((item, index) => (
                <div key={index} className="ml-2">
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  {/* Optional comment shown in italics */}
                  {item.comment && (
                    <div className="text-xs italic text-gray-400">“{item.comment}”</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Button to restart the completed order */}
      <button
        onClick={handleRestartOrder}
        className="mt-4 py-1 bg-yellow-700 hover:bg-yellow-800 rounded text-white text-sm font-semibold"
      >
        Restart Order
      </button>
    </div>
  );
};

// Component: the main Completed page showing a grid of all completed orders
const Completed = () => {
  const [orders, setOrders] = useState([]); // List of orders to render
  const { filters } = useContext(FilterContext); // Pull in active course filters

  // Effect hook: runs on mount and every time filters change
  useEffect(() => {
    // Trigger server to send current orders
    const fetchInitial = () => socket.emit("requestOrders");

    fetchInitial(); // Initial fetch
    const interval = setInterval(fetchInitial, 1000); // Auto refresh every 1s

    // Handler for initial socket response
    const handleInitial = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "completed" && // Only include completed orders
          o.courses.some((course) => filters[course.type]) // Must match active filters
      );
      setOrders(filtered);
    };

    // Handler for real-time updates from server
    const handleUpdate = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "completed" &&
          o.courses.some((course) => filters[course.type])
      );
      setOrders(filtered);
    };

    // Attach socket listeners
    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    // Cleanup socket and interval on component unmount
    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [filters]); // Dependencies: runs effect again if filters change

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Grid layout: scrollable horizontal order cards */}
      <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
=======
import React from 'react';
import CompletedCard from '../components/ordercards/CompletedCard';
const Completed = () => {
  return (
    <div>
      <div className= "flex gap-4 overflow-x-auto p-4" >
      <CompletedCard />
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      </div>
    </div>
  );
};

export default Completed;
