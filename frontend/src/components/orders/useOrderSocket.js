// React hook utilities
import { useEffect, useState } from "react";

// WebSocket service for real-time communication
import socket from "../../services/socket";
import { playBeep } from "../../utils/beep"; // Import sound utility

const useOrderSocket = (statusFilter, courseFilter) => {
  // State to hold the list of filtered orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Emit a request to the server for all orders
    const fetchInitial = () => socket.emit("requestOrders");
    fetchInitial();

    // Repeat the fetch every second to keep data fresh (fallback to sockets)
    const interval = setInterval(fetchInitial, 1000);

    // Filter orders based on the status and course type filter
    const filterFn = (data) =>
      data.filter(
        (o) =>
          // If a statusFilter is provided, filter by it
          (statusFilter ? o.status === statusFilter : true) &&
          // Ensure at least one course in the order matches an active filter
          o.courses.some((course) => courseFilter[course.type])
      );

    // Handle the initial full list of orders
    const handleInitial = (data) => setOrders(filterFn(data));

    // Handle individual order updates
    const handleUpdate = (data) => {
      setOrders(filterFn(data));
      playBeep(); // Play sound when an update is received
    };
    // Register WebSocket listeners
    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    // Cleanup: remove listeners and polling interval on unmount or dependency change
    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [statusFilter, courseFilter]); // Re-run effect when filters change

  return orders; // Return the filtered list of orders
};

export default useOrderSocket;
