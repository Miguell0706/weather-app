import React, { useState, useEffect } from 'react';

function AirQuality({ weatherData }) {
  const [airQuality, setAirQuality] = useState(null);
  const [pollutantText, setPollutantText] = useState('Choose a pollutant to get information about it');
  const [pollutant, setPollutant] = useState(null);

  const levels = {
    co: [4400, 9400, 12400, 15400, 30400],
    no2: [100, 200, 400, 1000, 2000],
    o3: [100, 160, 200, 300, 400],
    so2: [100, 200, 500, 1000, 2000],
    pm2_5: [12, 35.4, 55.4, 150.4, 250.4],
    pm10: [54, 154, 254, 354, 424],
  };

  const ratings = ["Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous"];

  const pollutantInfo = {
    pm2_5: {
      name: "PM2.5",
      summary: "PM2.5 refers to fine particulate matter that is 2.5 micrometers or smaller in diameter. These particles can penetrate deep into the lungs and even enter the bloodstream.",
      effects: "PM2.5 can cause respiratory issues and cardiovascular problems.",
      sources: "Common sources include vehicle emissions, industrial processes, and wildfires."
    },
    pm10: {
      name: "PM10",
      summary: "PM10 refers to particulate matter that is 10 micrometers or smaller in diameter. These particles are less fine than PM2.5 but can still affect health.",
      effects: "PM10 can cause respiratory issues, especially in children and the elderly.",
      sources: "Common sources include dust from roads, agriculture, and construction sites."
    },
    o3: {
      name: "Ozone (O3)",
      summary: "Ozone is a gas composed of three oxygen atoms. It is found both at ground level and in the upper atmosphere.",
      effects: "Ozone can cause respiratory issues and exacerbate asthma.",
      sources: "Common sources include vehicle emissions and industrial activities reacting with sunlight."
    },
    so2: {
      name: "Sulfur Dioxide (SO2)",
      summary: "Sulfur dioxide is a gas with a pungent, irritating smell. It is a major air pollutant and has significant health and environmental impacts.",
      effects: "SO2 can cause respiratory problems and irritate the eyes.",
      sources: "Common sources include burning fossil fuels and industrial processes."
    },
    no2: {
      name: "Nitrogen Dioxide (NO2)",
      summary: "Nitrogen dioxide is a reddish-brown gas with a characteristic sharp, biting odor. It is a significant air pollutant.",
      effects: "NO2 can cause respiratory issues and contribute to the formation of smog.",
      sources: "Common sources include vehicle emissions and power plants."
    },
    co: {
      name: "Carbon Monoxide (CO)",
      summary: "Carbon monoxide is a colorless, odorless gas that can be harmful when inhaled in large amounts. It is produced by burning fossil fuels.",
      effects: "CO can cause headaches, dizziness, and even death at high levels.",
      sources: "Common sources include vehicle emissions and burning of fossil fuels."
    }
  };

  useEffect(() => {
    if (weatherData && weatherData.current && weatherData.current.air_quality) {
      setAirQuality(weatherData.current.air_quality);
    }
  }, [weatherData]);

  const getAirQualityRating = (value, type) => {
    for (let i = 4; i >= 0; i--) {
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

  const updatePollutantText = (selectedPollutant) => {
    setPollutant(selectedPollutant);

    if (pollutantInfo[selectedPollutant]) {
      const value = airQuality[selectedPollutant];
      const rating = getAirQualityRating(value, selectedPollutant);
      const { name,summary, effects, sources } = pollutantInfo[selectedPollutant];
      setPollutantText(`Air quality index for ${name} is ${value} (${rating}). ${summary} ${effects} Sources: ${sources}`);
    } else {
      setPollutantText(null);
    }
  };

  if (!airQuality) return <p style={{ textAlign: 'center', color: 'white' }}>Loading...</p>;

  return (
    <div className='air-quality-container'>
      <div className='air-quality-pollutants'>
        {Object.keys(pollutantInfo).map((pollutant) => {
          const value = airQuality[pollutant];
          const rating = getAirQualityRating(value, pollutant);
          const color = getColorForRating(rating);
          return (
            <button
              className='air-quality-pollutant'
              key={pollutant}
              style={{ color }}
              onClick={() => updatePollutantText(pollutant)}
            >
              {pollutant.toUpperCase()}: {value} ({rating})
            </button>
          );
        })}
      </div>
      <div className='pollutant-info'>
        {pollutant && <h2>{pollutantInfo[pollutant].name}</h2>}
        <p>
          {pollutantText || 'Loading...'}
        </p>
      </div>
    </div>
  );
}

export default AirQuality;