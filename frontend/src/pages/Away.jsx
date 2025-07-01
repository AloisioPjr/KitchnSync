<<<<<<< HEAD
// React and hooks
import React, { useEffect, useState, useContext } from "react";
// Socket client for real-time communication
import socket from "../services/socket";
// Context to access course filters from Settings
import { FilterContext } from "../context/FilterContext";

// Determine colour of header based on how long ago the order was called away
const getTimeColour = (calledAwayAt) => {
  const now = new Date();
  const called = new Date(calledAwayAt);
  const diffMins = Math.floor((now - called) / 60000); // Time diff in minutes

  // Colour codes based on timing thresholds
  if (diffMins < 10) return "bg-green-600";
  if (diffMins < 15) return "bg-yellow-600";
  return "bg-red-700";
};

// Determine background colour of each course block based on its status
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

// Logic to determine the next course that should be "awayed" or "sent"
const getNextCourseAction = (courses) => {
  const courseOrder = ["Starters", "Mains", "Desserts"]; // Ordered sequence

  // Find first course in sequence that is still on hold or away
  for (const type of courseOrder) {
    const course = courses.find((c) => c.type === type);
    if (!course) continue;

    if (course.status === "on hold") {
      return { type, action: "away" };
    }

    if (course.status === "away") {
      return { type, action: "send" };
    }
  }

  // Edge case: if a course is still "away" but not yet completed
  const pending = courses.find((c) => c.status !== "completed");
  if (pending?.status === "away") {
    return { type: pending.type, action: "send" };
  }

  return null; // No further action needed
};

// Renders each individual order card
const OrderCard = ({ order }) => {
  const headerColor = getTimeColour(order.calledAwayAt || order.createdAt); // Get dynamic header colour
  const nextCourseAction = getNextCourseAction(order.courses); // Determine next action

  // Handles the course action button click
  const handleCourseAction = () => {
    if (!nextCourseAction) return;

    const { type, action } = nextCourseAction;

    // Update course statuses based on action
    const updatedCourses = order.courses.map((course) =>
      course.type === type
        ? { ...course, status: action === "away" ? "away" : "completed" }
        : course
    );

    // Determine if all courses are now completed
    const isNowComplete = updatedCourses.every((c) => c.status === "completed");

    // Prepare updated order object
    const updatedOrder = {
      ...order,
      courses: updatedCourses,
      status: isNowComplete ? "completed" : action === "away" ? "away" : "on hold",
      calledAwayAt: action === "away" ? new Date() : order.calledAwayAt,
    };

    // Emit updated order to backend
    socket.emit("updateOrder", updatedOrder);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex flex-col justify-between">
      <div>
        {/* Header with dynamic colour */}
        <div className={`text-white text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          #{order.orderNumber} | Table {order.tableNumber} | {order.waiter}
        </div>

        {/* Course and item display */}
        <div className="text-gray-300 text-sm space-y-2">
          {order.courses.map((course, idx) => (
            <div key={idx} className={`p-2 rounded ${getCourseBackground(course.status)}`}>
              <div className="font-semibold text-yellow-300">{course.type}</div>
              {course.items.map((item, index) => (
                <div key={index} className="ml-2">
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  {item.comment && (
                    <div className="text-xs italic text-gray-400">“{item.comment}”</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Action button for sending/awaying courses */}
      {nextCourseAction && (
        <button
          onClick={handleCourseAction}
          className={`mt-4 py-1 ${
            nextCourseAction.action === "away"
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-green-600 hover:bg-green-700"
          } rounded text-white text-sm font-semibold`}
        >
          {nextCourseAction.action === "away"
            ? `${nextCourseAction.type} Away`
            : `Send ${nextCourseAction.type}`}
        </button>
      )}
    </div>
  );
};

// Main Away component to show all active "away" orders
const Away = () => {
  const [orders, setOrders] = useState([]); // Orders state
  const { filters } = useContext(FilterContext); // Access filter toggles

  useEffect(() => {
    const fetchInitial = () => socket.emit("requestOrders"); // Ask server for fresh data

    fetchInitial();
    const interval = setInterval(fetchInitial, 1000); // Re-fetch every 1 second

    // Handle initial load
    const handleInitial = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "away" && // Only "away" status orders
          o.courses.some((course) => filters[course.type]) // Matches filters
      );
      setOrders(filtered);
    };

    // Handle updates from socket
    const handleUpdate = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "away" &&
          o.courses.some((course) => filters[course.type])
      );
      setOrders(filtered);
    };

    // Listen to socket events
    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    // Clean up socket listeners and interval
    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [filters]); // Depend on filters

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Grid of order cards, scrollable horizontally */}
      <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
=======
import React from 'react';
import SendDesserts from '../components/ordercards/SendDesserts';
import SendMains from '../components/ordercards/SendMains';
import SendStarters from '../components/ordercards/SendStarters';

const Away = () => {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto p-4">
        <SendDesserts />
        <SendMains />
        <SendStarters />
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Away;
=======
export default Away;
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
