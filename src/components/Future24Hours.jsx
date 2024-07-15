import React, { useState, useEffect } from "react";
function Future24Hours({city, temp_unit}) {
  const [futureData, setFutureData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (city) {
      const fetchFutureData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=5289cade5c22487d92285423240707&q=${city}&days=2`
          );
          const data = await response.json();
          // Get the current hour
          const currentHour = new Date().getHours();
          // Filter the hourly data to get the 24-hour period starting from the next hour
          const filteredData = data.forecast.forecastday[0].hour.filter(
            (hourData) => new Date(hourData.time).getHours() > currentHour
          );
          // If less than 24 hours left in the day, get remaining hours from the next day
          if (filteredData.length < 24) {
            const nextDayData = data.forecast.forecastday[1].hour.filter(
              (hourData) => new Date(hourData.time).getHours() <= currentHour
            );
            filteredData.push(...nextDayData.slice(0, 24 - filteredData.length));
          }

          setFutureData(filteredData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching future data:", error);
          setIsLoading(false);
        }
      };
      fetchFutureData();
    }
  }, [city]);

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const isTomorrow = (time) => {
    const now = new Date();
    const date = new Date(time);
    return date.getDate() === now.getDate() + 1;
  };
  useEffect(() => {
    let temps = document.querySelectorAll('.daily-temp');

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
    <div>
      {isLoading ? (
        <p>Loading future data...</p>
      ) : (
        <div className='future-24-hours-container'>
          {futureData.map((hourData, index) => (
            <div className='future-24-hours' key={index}>
              {isTomorrow(hourData.time) && <p>Tomorrow</p>}
              <p>{formatTime(hourData.time)}</p>
              <p className='daily-temp' data-temp-f={hourData.temp_f}>{convertTemperature(hourData.temp_f)}</p>
              <p>{hourData.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Future24Hours;
