import React, { useState, useEffect } from "react";
function Future24Hours({city}) {
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
          console.log(data,currentHour)
          // Filter the hourly data to get the 24-hour period starting from the next hour
          const filteredData = data.forecast.forecastday[0].hour.filter(
            (hourData) => new Date(hourData.time).getHours() > currentHour
          );
          console.log(filteredData)
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

  return (
    <div>
      {isLoading ? (
        <p>Loading future data...</p>
      ) : (
        <div className='future-24-hours-container'>
          {futureData.map((hourData, index) => (
            <div className='future-24-hours' key={index}>
              <p>{hourData.time}</p>
              <p>{hourData.temp_f}°F</p>
              <p>{hourData.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Future24Hours;
