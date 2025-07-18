import { useEffect, useState } from "react";
import socket from "../../services/socket";

const useOrderSocket = (statusFilter, courseFilter) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchInitial = () => socket.emit("requestOrders");
    fetchInitial();
    const interval = setInterval(fetchInitial, 1000);

    const filterFn = (data) =>
      data.filter(
        (o) =>
          (statusFilter ? o.status === statusFilter : true) &&
          o.courses.some((course) => courseFilter[course.type])
      );

    const handleInitial = (data) => setOrders(filterFn(data));
    const handleUpdate = (data) => setOrders(filterFn(data));

    socket.on("initialOrders", handleInitial);
    socket.on("orderUpdated", handleUpdate);

    return () => {
      clearInterval(interval);
      socket.off("initialOrders", handleInitial);
      socket.off("orderUpdated", handleUpdate);
    };
  }, [statusFilter, courseFilter]);

  return orders;
};

export default useOrderSocket;
