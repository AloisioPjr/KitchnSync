import React from 'react';
import SendDesserts from '../components/ordercards/SendDesserts';
import SendMains from '../components/ordercards/SendMains';
import SendStarters from '../components/ordercards/SendStarters';
import CompletedCard from '../components/ordercards/CompletedCard';
import CancelledCard from '../components/ordercards/CancelledCard';

const AllOrders = () => {
  return (
    <div className="h-full overflow-y-hidden overflow-x-auto p-4">
      <div className="flex gap-4 flex-nowrap h-full">
        <SendDesserts />
        <SendMains />
        <SendStarters />
        <CompletedCard />
        <CancelledCard />
      </div>
    </div>
  );
};

export default AllOrders;
