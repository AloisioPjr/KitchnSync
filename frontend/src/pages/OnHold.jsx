import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import useOrderSocket from "../components/orders/useOrderSocket";
import OrderGrid from "../components/orders/OrderGrid";

const OnHold = () => {
  const { filters } = useContext(FilterContext);
  const orders = useOrderSocket("on hold", filters);
  return <OrderGrid orders={orders} />;
};

export default OnHold;
