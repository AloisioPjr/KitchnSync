import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import useOrderSocket from "../components/orders/useOrderSocket";
import OrderGrid from "../components/orders/OrderGrid";

const Completed = () => {
  const { filters } = useContext(FilterContext);
  const orders = useOrderSocket("completed", filters);
  return <OrderGrid orders={orders} />;
};

export default Completed;
