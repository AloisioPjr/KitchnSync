import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import useOrderSocket from "../components/orders/useOrderSocket";
import OrderGrid from "../components/orders/OrderGrid";

const Cancelled = () => {
  const { filters } = useContext(FilterContext);
  const orders = useOrderSocket("cancelled", filters);
  return <OrderGrid orders={orders} />;
};

export default Cancelled;
