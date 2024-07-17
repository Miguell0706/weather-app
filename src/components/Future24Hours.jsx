<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
import React, { useState, useEffect, useRef} from "react";
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f

function Future24Hours({ city, temp_unit }) {
  const [futureData, setFutureData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const [todays_date, setTodaysDate] = useState("");
=======
  const [todays_date, setTodaysDate] = useState('');
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
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
<<<<<<< HEAD
=======
      console.log(future_24_hours_container);
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f

      if (future_24_hours_container) {
        const mouseDownHandler = (e) => {
          isDown.current = true;
          startX.current = e.pageX - future_24_hours_container.offsetLeft;
          scrollLeft.current = future_24_hours_container.scrollLeft;
<<<<<<< HEAD
          future_24_hours_container.style.cursor = "grabbing";
=======
          future_24_hours_container.style.cursor = 'grabbing';
          console.log('Mouse Down:', startX.current, scrollLeft.current);
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
        };

        const mouseLeaveHandler = () => {
          isDown.current = false;
<<<<<<< HEAD
          future_24_hours_container.style.cursor = "grab";
=======
          future_24_hours_container.style.cursor = 'grab';
          console.log('mouse leave');
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
        };

        const mouseUpHandler = () => {
          isDown.current = false;
<<<<<<< HEAD
          future_24_hours_container.style.cursor = "grab";
=======
          future_24_hours_container.style.cursor = 'grab';
          console.log('mouse up');
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
        };

        const mouseMoveHandler = (e) => {
          if (!isDown.current) return;
          e.preventDefault();
          const x = e.pageX - future_24_hours_container.offsetLeft;
          const walk = (x - startX.current) * 3; // Adjust the scroll speed
<<<<<<< HEAD
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
=======
          future_24_hours_container.scrollLeft = scrollLeft.current-walk
          console.log("Mouse Move: ", x, walk, future_24_hours_container.scrollLeft);

        };

        future_24_hours_container.addEventListener('mousedown', mouseDownHandler);
        future_24_hours_container.addEventListener('mouseleave', mouseLeaveHandler);
        future_24_hours_container.addEventListener('mouseup', mouseUpHandler);
        future_24_hours_container.addEventListener('mousemove', mouseMoveHandler);

        return () => {
          future_24_hours_container.removeEventListener('mousedown', mouseDownHandler);
          future_24_hours_container.removeEventListener('mouseleave', mouseLeaveHandler);
          future_24_hours_container.removeEventListener('mouseup', mouseUpHandler);
          future_24_hours_container.removeEventListener('mousemove', mouseMoveHandler);
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
        };
      }
    };

    const timeoutId = setTimeout(attachEventListeners, 400); // Delay to ensure DOM is ready

    return () => clearTimeout(timeoutId);
  }, [containerRef]);
  useEffect(() => {
<<<<<<< HEAD
    const temps = document.querySelectorAll(".daily-temp");
=======
    const temps = document.querySelectorAll('.daily-temp');
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f

    temps.forEach((temp) => {
      const tempF = parseFloat(temp.dataset.tempF);
      temp.textContent = `${convertTemperature(tempF)}`;
    });
  }, [temp_unit]);
<<<<<<< HEAD
=======

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
    const date = new Date(time.split(' ')[0]);
    const todays_date_object = new Date(todays_date);
    return date.getDate() === todays_date_object.getDate() + 1;
  };
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f

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
<<<<<<< HEAD
    <div className="future-24-hours-container" ref={containerRef}>
=======
    <div className='future-24-hours-container' ref={containerRef}>
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
      {isLoading ? (
        <p>Loading future data...</p>
      ) : (
        <div>
          {futureData.map((hourData, index) => (
<<<<<<< HEAD
            <div className="future-24-hours" key={index}>
              {isTomorrow(hourData.time) && <p>Tomorrow</p>}
              <p>{formatTime(hourData.time)}</p>
              <p className="daily-temp" data-temp-f={hourData.temp_f}>
                {convertTemperature(hourData.temp_f)}
              </p>
              <p>{hourData.condition.text}</p>
            </div>
          ))}
=======
              <div className='future-24-hours' key={index}>
                {isTomorrow(hourData.time) && <p>Tomorrow</p>}
                <p>{formatTime(hourData.time)}</p>
                <p className='daily-temp' data-temp-f={hourData.temp_f}>{convertTemperature(hourData.temp_f)}</p>
                <p>{hourData.condition.text}</p>
              </div>
            ))} 
>>>>>>> dfa3816845cf6eaaf900dc0a9955b7d61ee8914f
        </div>
      )}
    </div>
  );
}

export default Future24Hours;