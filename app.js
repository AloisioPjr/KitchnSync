import React from 'react';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar onTabChange={(tab) => console.log('Selected Tab:', tab)} />
      {/* Display content based on active tab */}
    </div>
  );
};

export default App;
