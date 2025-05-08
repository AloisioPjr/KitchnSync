import React from 'react';
import SendDesserts from '../components/ordercards/SendDesserts';
import SendMains from '../components/ordercards/SendMains';
import SendStarters from '../components/ordercards/SendStarters';

const Away = () => {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto p-4">
        <SendDesserts />
        <SendMains />
        <SendStarters />
      </div>
    </div>
  );
};

export default Away;