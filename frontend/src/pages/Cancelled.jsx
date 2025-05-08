import React from 'react';
import CancelledCard from '../components/ordercards/CancelledCard';
const Cancelled = () => {
  return (
    <div>
      
      <div className="flex gap-4 overflow-x-auto p-4">
        <CancelledCard />
        
      </div>
    </div>
  );
};

export default Cancelled;
