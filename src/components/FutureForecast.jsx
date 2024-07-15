import React, { useState, useEffect } from "react";

function FutureForecast({ city, temp_unit }) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=5289cade5c22487d92285423240707&q=${city}&days=7`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setForecast(data.forecast.forecastday.slice(2));
        } catch (error) {
          console.error('Error fetching the weather data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchForecast();
    }
  }, [city]);

  useEffect(() => {
    let temps = document.querySelectorAll('.temperature');

    temps.forEach((temp) => {
      const tempF = parseFloat(temp.dataset.tempF);
      temp.textContent = `${convertTemperature(tempF)}`;
    });
  }, [temp_unit]);

  const convertTemperature = (tempF) => {
    switch (temp_unit) {
      case '°C':
        return `${Math.round((tempF - 32) * 5 / 9)} °C`;
      default:
        return `${Math.round(tempF)} °F`;
    }
  };
  return (
    <div className="future-forecast-container">
      <h2>5-Day Forecast for {city}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {forecast.map((day, index) => (
            <div key={index} className="day-container">
              <p className="day">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p className="temperature" data-temp-f={day.day.avgtemp_f}>{convertTemperature(day.day.avgtemp_f)}</p>
              <p className="weather">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default FutureForecast;
