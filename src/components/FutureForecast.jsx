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
            `https://api.weatherapi.com/v1/forecast.json?key=5289cade5c22487d92285423240707&q=${city}&days=7`
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
<<<<<<< HEAD
=======
  useEffect(() => {
    const attachEventListeners = () => {
      const future_forecast_container = containerRef.current;
      console.log(future_forecast_container);

      if (future_forecast_container) {
        const mouseDownHandler = (e) => {
          isDown.current = true;
          startX.current = e.pageX - future_forecast_container.offsetLeft;
          scrollLeft.current = future_forecast_container.scrollLeft;
          future_forecast_container.style.cursor = 'grabbing';
          console.log('Mouse Down:', startX.current, scrollLeft.current);
        };

        const mouseLeaveHandler = () => {
          isDown.current = false;
          future_forecast_container.style.cursor = 'grab';
          console.log('mouse leave');
        };

        const mouseUpHandler = () => {
          isDown.current = false;
          future_forecast_container.style.cursor = 'grab';
          console.log('mouse up');
        };

        const mouseMoveHandler = (e) => {
          if (!isDown.current) return;
          e.preventDefault();
          const x = e.pageX - future_forecast_container.offsetLeft;
          const walk = (x - startX.current) * 3; // Adjust the scroll speed
          future_forecast_container.scrollLeft = scrollLeft.current-walk
          console.log("Mouse Move: ", x, walk, future_forecast_container.scrollLeft);

        };

        future_forecast_container.addEventListener('mousedown', mouseDownHandler);
        future_forecast_container.addEventListener('mouseleave', mouseLeaveHandler);
        future_forecast_container.addEventListener('mouseup', mouseUpHandler);
        future_forecast_container.addEventListener('mousemove', mouseMoveHandler);

        return () => {
          future_forecast_container.removeEventListener('mousedown', mouseDownHandler);
          future_forecast_container.removeEventListener('mouseleave', mouseLeaveHandler);
          future_forecast_container.removeEventListener('mouseup', mouseUpHandler);
          future_forecast_container.removeEventListener('mousemove', mouseMoveHandler);
        };
      }
    };

    const timeoutId = setTimeout(attachEventListeners, 400); // Delay to ensure DOM is ready

    return () => clearTimeout(timeoutId);
  }, [containerRef]);
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
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
          future_forecast_container.removeEventListener(
            "mouseup",
            mouseUpHandler
          );
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
  useEffect(() => {
    let temps = document.querySelectorAll(".temperature");

    temps.forEach((temp) => {
      const tempF = parseFloat(temp.dataset.tempF);
      temp.textContent = `${convertTemperature(tempF)}`;
    });
  }, [temp_unit]);

  const convertTemperature = (tempF) => {
    switch (temp_unit) {
      case "°C":
        return `${Math.round(((tempF - 32) * 5) / 9)} °C`;
      default:
        return `${Math.round(tempF)} °F`;
    }
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
              <p className="temperature" data-temp-f={day.day.avgtemp_f}>
                {convertTemperature(day.day.avgtemp_f)}
              </p>
              <p className="weather">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default FutureForecast;
