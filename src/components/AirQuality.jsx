import React, { useState, useEffect } from 'react';

function AirQuality({ weatherData }) {
  const [airQuality, setAirQuality] = useState(null);

  const levels = {
    co: [4400, 9400, 12400, 15400, 30400, 30500],  
    no2: [100, 200, 400, 1000, 2000, 2001],    
    o3: [100, 160, 200, 300, 400, 401],           
    so2: [100, 200, 500, 1000, 2000, 2001],          
    pm2_5: [12, 35.4, 55.4, 150.4, 250.4, 250.5],        
    pm10: [54, 154, 254, 354, 424, 425],            
  };

  const ratings = ["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous"];

  useEffect(() => {
    if (weatherData && weatherData.current && weatherData.current.air_quality) {
      setAirQuality(weatherData.current.air_quality);
    }
  }, [weatherData]);

  const getAirQualityRating = (value, type) => {
    for (let i = 5; i >= 0; i--) {
      if (value >= levels[type][i]) {
        return ratings[i];
      }
    }
    return "Good";
  };

  const getColorForRating = (rating) => {
    switch (rating) {
      case "Good": return "green";
      case "Moderate": return "yellow";
      case "Unhealthy for Sensitive Groups": return "orange";
      case "Unhealthy": return "red";
      case "Very Unhealthy": return "purple";
      case "Hazardous": return "maroon";
      default: return "white";
    }
  };

  if (!airQuality) return <p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>;

  return (
    <div className='air-quality-container'>
      {["co", "no2", "o3", "so2", "pm2_5", "pm10"].map((pollutant) => {
        const value = airQuality[pollutant];
        const rating = getAirQualityRating(value, pollutant);
        const color = getColorForRating(rating);
        return (
          <p key={pollutant} style={{ color }}>
            {pollutant.toUpperCase()}: {value} ({rating})
          </p>
        );
      })}
    </div>
  );
}

export default AirQuality;