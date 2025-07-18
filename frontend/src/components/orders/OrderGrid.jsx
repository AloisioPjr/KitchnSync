import React from "react";
import OrderCard from "./OrderCard";

const OrderGrid = ({ orders }) => (
  <div className="h-full w-full overflow-auto p-2">
    <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  </div>
);

export default OrderGrid;
