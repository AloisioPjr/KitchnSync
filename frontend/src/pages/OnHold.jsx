<<<<<<< HEAD
// React and hooks
import React, { useEffect, useState, useContext } from "react";
// Socket for real-time communication
import socket from "../services/socket";
// Filter context from Settings page
import { FilterContext } from "../context/FilterContext";

// Map each course status to its background colour for UI
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

// Determines which course is ready to be marked as "completed"
const getNextCourseToSend = (courses) => {
  const starters = courses.find((c) => c.type === "Starters");
  const mains = courses.find((c) => c.type === "Mains");
  const desserts = courses.find((c) => c.type === "Desserts");

  // Logic for progression: Starters → Mains → Desserts
  if (starters?.status === "away") return "Starters";
  if (starters?.status === "completed" && mains?.status === "away") return "Mains";
  if (
    starters?.status === "completed" &&
    mains?.status === "completed" &&
    desserts?.status === "away"
  )
    return "Desserts";

  return null; // No course ready to be marked as sent
};

// Displays an individual on-hold order card
const OrderCard = ({ order }) => {
  const headerColor = "bg-blue-700"; // Consistent colour for "on hold" header
  const nextCourse = getNextCourseToSend(order.courses); // Determine what's ready to send

  // Handler to mark a course as completed
  const handleSendCourse = () => {
    if (!nextCourse) return;

    const updatedCourses = order.courses.map((course) =>
      course.type === nextCourse ? { ...course, status: "completed" } : course
    );

    const updatedOrder = {
      ...order,
      courses: updatedCourses,
      status: nextCourse === "Desserts" ? "completed" : "on hold", // Update order status accordingly
    };

    socket.emit("updateOrder", updatedOrder); // Send update to server
  };

  // Handler to mark the first "on hold" course as "away"
  const handleSendAwayForFirstOnHoldCourse = () => {
    const firstOnHoldCourse = order.courses.find((course) => course.status === "on hold");
    if (!firstOnHoldCourse) return;

    const updatedCourses = order.courses.map((course) =>
      course === firstOnHoldCourse ? { ...course, status: "away" } : course
    );

    const updatedOrder = {
      ...order,
      courses: updatedCourses,
      status: "away",
      calledAwayAt: new Date(), // Record away timestamp
    };

    socket.emit("updateOrder", updatedOrder); // Emit update to backend
  };

  const firstOnHoldCourse = order.courses.find((course) => course.status === "on hold");

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex flex-col justify-between">
      <div>
        {/* Order header showing number, table, waiter */}
        <div className={`text-white text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          #{order.orderNumber} | Table {order.tableNumber} | {order.waiter}
        </div>

        {/* Course listing with items */}
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

      {/* Button to send first on-hold course to "away" */}
      {order.status === "on hold" && firstOnHoldCourse && (
        <button
          onClick={handleSendAwayForFirstOnHoldCourse}
          className="mt-4 py-1 bg-blue-700 hover:bg-blue-800 rounded text-white text-sm font-semibold"
        >
          {firstOnHoldCourse.type} Away
        </button>
      )}

      {/* Button to send currently "away" course to "completed" */}
      {nextCourse && (
        <button
          onClick={handleSendCourse}
          className="mt-2 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-semibold"
        >
          Send {nextCourse}
        </button>
      )}
    </div>
  );
};

// Page component for "On Hold" orders screen
const OnHold = () => {
  const [orders, setOrders] = useState([]); // State for order list
  const { filters } = useContext(FilterContext); // Get current course-type filters

  // Real-time socket sync effect
  useEffect(() => {
    const fetchInitial = () => socket.emit("requestOrders"); // Ask backend for latest orders

    fetchInitial(); // Initial request
    const interval = setInterval(fetchInitial, 1000); // Auto-refresh every second

    // When socket returns orders (first load)
    const handleInitial = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "on hold" && // Only "on hold" orders
          o.courses.some((course) => filters[course.type]) // Match course filters
      );
      setOrders(filtered);
    };

    // When order is updated and pushed via socket
    const handleUpdate = (data) => {
      const filtered = data.filter(
        (o) =>
          o.status === "on hold" &&
          o.courses.some((course) => filters[course.type])
      );
      setOrders(filtered);
    };

    // Socket listeners
    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [filters]); // Rerun effect when filters change

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Grid layout: scrollable horizontally */}
      <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OnHold;
=======
import React from 'react';
import OnHoldCard from '../components/ordercards/OnHoldCard';


const OnHold = () => {
  return (
    
      <div className="flex gap-4 overflow-x-auto p-4">
        <OnHoldCard />
        
      </div>
    
  );
};

export default OnHold;
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
