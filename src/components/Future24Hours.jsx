import React, { useState, useEffect, useRef } from "react";

function Future24Hours({ city, temp_unit }) {
  const [futureData, setFutureData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todays_date, setTodaysDate] = useState("");
  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (city) {
      const fetchFutureData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=5289cade5c22487d92285423240707&q=${city}&days=2`
          );
          const data = await response.json();
          setTodaysDate(data.forecast.forecastday[0].date);

          const locationTime = new Date(data.location.localtime);
          const currentHour = locationTime.getHours();
          const filteredData = data.forecast.forecastday[0].hour.filter(
            (hourData) => new Date(hourData.time).getHours() > currentHour
          );

          if (filteredData.length < 24) {
            const nextDayData = data.forecast.forecastday[1].hour.filter(
              (hourData) => new Date(hourData.time).getHours() <= currentHour
            );
            filteredData.push(
              ...nextDayData.slice(0, 24 - filteredData.length)
            );
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

  useEffect(() => {
    const attachEventListeners = () => {
      const future_24_hours_container = containerRef.current;

      if (future_24_hours_container) {
        const mouseDownHandler = (e) => {
          isDown.current = true;
          startX.current = e.pageX - future_24_hours_container.offsetLeft;
          scrollLeft.current = future_24_hours_container.scrollLeft;
          future_24_hours_container.style.cursor = "grabbing";
        };

        const mouseLeaveHandler = () => {
          isDown.current = false;
          future_24_hours_container.style.cursor = "grab";
        };

        const mouseUpHandler = () => {
          isDown.current = false;
          future_24_hours_container.style.cursor = "grab";
        };

        const mouseMoveHandler = (e) => {
          if (!isDown.current) return;
          e.preventDefault();
          const x = e.pageX - future_24_hours_container.offsetLeft;
          const walk = (x - startX.current) * 3; // Adjust the scroll speed
          future_24_hours_container.scrollLeft = scrollLeft.current - walk;
        };

        future_24_hours_container.addEventListener(
          "mousedown",
          mouseDownHandler
        );
        future_24_hours_container.addEventListener(
          "mouseleave",
          mouseLeaveHandler
        );
        future_24_hours_container.addEventListener("mouseup", mouseUpHandler);
        future_24_hours_container.addEventListener(
          "mousemove",
          mouseMoveHandler
        );

        return () => {
          future_24_hours_container.removeEventListener(
            "mousedown",
            mouseDownHandler
          );
          future_24_hours_container.removeEventListener(
            "mouseleave",
            mouseLeaveHandler
          );
          future_24_hours_container.removeEventListener(
            "mouseup",
            mouseUpHandler
          );
          future_24_hours_container.removeEventListener(
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
    const temps = document.querySelectorAll(".daily-temp");

    temps.forEach((temp) => {
      const tempF = parseFloat(temp.dataset.tempF);
      temp.textContent = `${convertTemperature(tempF)}`;
    });
  }, [temp_unit]);

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const isTomorrow = (time) => {
    const date = new Date(time.split(" ")[0]);
    const todays_date_object = new Date(todays_date);
    return date.getDate() === todays_date_object.getDate() + 1;
  };

  const convertTemperature = (tempF) => {
    switch (temp_unit) {
      case "°C":
        return `${Math.round(((tempF - 32) * 5) / 9)} °C`;
      default:
        return `${Math.round(tempF)} °F`;
    }
  };

  return (
    <div className="future-24-hours-container" ref={containerRef}>
      {isLoading ? (
        <p>Loading future data...</p>
      ) : (
        <div>
          {futureData.map((hourData, index) => (
            <div className="future-24-hours" key={index}>
              {isTomorrow(hourData.time) && <p>Tomorrow</p>}
              <p>{formatTime(hourData.time)}</p>
              <p className="daily-temp" data-temp-f={hourData.temp_f}>
                {convertTemperature(hourData.temp_f)}
              </p>
              <p>{hourData.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Future24Hours;
