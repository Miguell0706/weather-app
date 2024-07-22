import React, { useState } from 'react';

function BottomDashboard(weatherData) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleBottomDashboard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bottom-dashboard-container">
      <p className="bottom-dashboard-opener" onClick={toggleBottomDashboard}>
        {isOpen ? (
          <span>&#x21d3; Click for less data of city!</span>
        ) : (
          <span>&#x21d1; Click for more data of city!</span>
        )}
      </p>
      <div className={`bottom-dashboard ${isOpen ? 'open' : ''}`}></div>
    </div>
  );
}

export default BottomDashboard;