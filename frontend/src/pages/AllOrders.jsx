import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import { ViewContext } from "../context/ViewContext";
import useOrderSocket from "../components/orders/useOrderSocket";
import OrderGrid from "../components/orders/OrderGrid";

const AllOrders = () => {
  const { filters } = useContext(FilterContext);
  const { searchQuery } = useContext(ViewContext);
  const orders = useOrderSocket(null, filters); // No status filter for AllOrders

  const filteredOrders = orders.filter(order => {
    const q = searchQuery.trim().toLowerCase();
    return (
      q === "" ||
      order.orderNumber.toLowerCase().includes(q) ||
      order.tableNumber.toLowerCase().includes(q) ||
      order.waiter.toLowerCase().includes(q) ||
      order.courses.some(course =>
        course.type.toLowerCase().includes(q) ||
        course.items.some(item =>
          item.name.toLowerCase().includes(q) ||
          (item.comment && item.comment.toLowerCase().includes(q))
        )
      )
    );
  });

  return <OrderGrid orders={filteredOrders} />;
};

export default AllOrders;
