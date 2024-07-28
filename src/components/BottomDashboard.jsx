import React, { useState } from 'react';
import AirQuality from './AirQuality';
import News from './News';

function BottomDashboard({ weatherData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Air-quality');
  
  const toggleBottomDashboard = () => {
    setIsOpen(!isOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Air-quality':
        return <AirQuality weatherData={weatherData}/>;
      case 'News':
        return <News weatherData={weatherData}/>;
      default:
        return null;
    }
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
      <div className={`bottom-dashboard ${isOpen ? 'open' : ''}`}>
        <div className='topic-selector'>
          <button className={activeTab === 'Air-quality' ? 'active' : ''} onClick={() => setActiveTab('Air-quality')}>Air quality</button>
          <button className={activeTab === 'News' ? 'active' : ''} onClick={() => setActiveTab('News')}>News</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default BottomDashboard;
