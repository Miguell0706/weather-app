import React, { useState, useEffect, useRef } from "react";

function FutureForecast({ city, temp_unit }) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setForecast(data.forecast.forecastday.slice(2));
        } catch (error) {
          console.error("Error fetching the weather data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchForecast();
    }
  }, [city]);

  useEffect(() => {
    const attachEventListeners = () => {
      const future_forecast_container = containerRef.current;

      if (future_forecast_container) {
        const mouseDownHandler = (e) => {
          isDown.current = true;
          startX.current = e.pageX - future_forecast_container.offsetLeft;
          scrollLeft.current = future_forecast_container.scrollLeft;
          future_forecast_container.style.cursor = "grabbing";
        };

        const mouseLeaveHandler = () => {
          isDown.current = false;
          future_forecast_container.style.cursor = "grab";
        };

        const mouseUpHandler = () => {
          isDown.current = false;
          future_forecast_container.style.cursor = "grab";
        };

        const mouseMoveHandler = (e) => {
          if (!isDown.current) return;
          e.preventDefault();
          const x = e.pageX - future_forecast_container.offsetLeft;
          const walk = (x - startX.current) * 3; // Adjust the scroll speed
          future_forecast_container.scrollLeft = scrollLeft.current - walk;
        };

        future_forecast_container.addEventListener(
          "mousedown",
          mouseDownHandler
        );
        future_forecast_container.addEventListener(
          "mouseleave",
          mouseLeaveHandler
        );
        future_forecast_container.addEventListener("mouseup", mouseUpHandler);
        future_forecast_container.addEventListener(
          "mousemove",
          mouseMoveHandler
        );

        return () => {
          future_forecast_container.removeEventListener(
            "mousedown",
            mouseDownHandler
          );
          future_forecast_container.removeEventListener(
            "mouseleave",
            mouseLeaveHandler
          );
          future_forecast_container.removeEventListener("mouseup", mouseUpHandler);
          future_forecast_container.removeEventListener(
            "mousemove",
            mouseMoveHandler
          );
        };
      }
    };

    const timeoutId = setTimeout(attachEventListeners, 400); // Delay to ensure DOM is ready

    return () => clearTimeout(timeoutId);
  }, [containerRef]);

  const convertTemperature = (tempF) => {
    switch (temp_unit) {
      case "°C":
        return `${Math.round(((tempF - 32) * 5) / 9)} °C`;
      default:
        return `${Math.round(tempF)} °F`;
    }
  };

  const getTemperatureText = (maxTempF, minTempF) => {
    return (
      <>
        {'high: '}{convertTemperature(maxTempF)} <br /> {'low: '}{convertTemperature(minTempF)}
      </>
    );
  };

  return (
    <div className="future-forecast-container" ref={containerRef}>
      <h2>5-Day Forecast for {city}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {forecast.map((day, index) => (
            <div key={index} className="day-container">
              <p className="day">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <p className="daily-temperature">
                {getTemperatureText(day.day.maxtemp_f, day.day.mintemp_f)}
              </p>
              <p className='daily-humidity'>Humidity: {day.day.avghumidity}%</p>
              <p className="daily-weather">{day.day.condition.text}</p>
              <img className="daily-icon" src={day.day.condition.icon} alt={day.day.condition.text}></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FutureForecast;