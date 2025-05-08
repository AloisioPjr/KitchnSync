import React from 'react';
import CompletedCard from '../components/ordercards/CompletedCard';
const Completed = () => {
  return (
    <div>
      <div className= "flex gap-4 overflow-x-auto p-4" >
      <CompletedCard />
      </div>
    </div>
  );
};

export default Completed;
