// React hook utilities
import { useEffect, useState } from "react";
import socket from "../../services/socket";
import { playBeep } from "../../utils/beep";




const useOrderSocket = (statusFilter, courseFilter) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.emit("requestOrders"); // Fetch once on mount

    const filterFn = (data) =>
      data.filter(
        (o) =>
          (!statusFilter || o.status === statusFilter) &&
          o.courses.some((course) => courseFilter[course.type])
      );

    const handleInitial = (data) => {
      setOrders(filterFn(data));
    };

    const handleUpdate = (data) => {
      setOrders(filterFn(data));
      playBeep(); // Play beep sound on any update
    };

    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    return () => {
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [statusFilter, courseFilter]);

  return orders;
};

export default useOrderSocket;
