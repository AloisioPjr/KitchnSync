import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import useOrderSocket from "../components/orders/useOrderSocket";
import OrderGrid from "../components/orders/OrderGrid";

const Away = () => {
  const { filters } = useContext(FilterContext);
  const orders = useOrderSocket("away", filters);
  return <OrderGrid orders={orders} />;
};

export default Away;
