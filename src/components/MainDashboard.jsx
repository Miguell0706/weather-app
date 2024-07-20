import "../styles/MainDashboard.css";
import Future24Hours from "./Future24Hours.jsx";
import FutureForecast from "./FutureForecast.jsx";
import Search from "./search.jsx";
import Background from "./Background.jsx";
import React, { useState, useEffect } from "react";
import TempButtons from "./TempButtons.jsx";

// BEGINING OF MAIN FUNCTION ====================================================>
function MainDashboard() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [timezone, setTimezone] = useState(null);
  const [localtime, setLocalTime] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedTemp, setFormattedTemp] = useState(null);
  const [temp_unit, setTempUnit] = useState("°F");

  // Function to get the city name from latitude and longitude OF DEVICE'S LOCATION======================================
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            (async () => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              try {
                const city = await getCityName(latitude, longitude);
                setCity(city);
              } catch (error) {
                console.error("Error:", error);
              }
            })();
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true, // Request high accuracy mode
            maximumAge: 0, // Do not use cached location
          }
        );
        async function getCityName(latitude, longitude) {
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1a67db714c05480c942b29d94e07952b`;
          let response = await fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const cityName = data.results[0].components.city;
              return cityName;
            })
            .catch((error) => {
              return "Error";
            });
          return response;
        }
      } else {
        console.error("Geolocation is not supported by this browser.");
        console.log("location denied");
      }
    };
    getLocation();
  }, []);
  // Function to fetch weather data for the selected city (by default uses device's current location at first) fomratiing is done here as well for data=====================================>
  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=5289cade5c22487d92285423240707&q=${city}`
          );
          const data = await response.json();
          setWeatherData(data);
          setTimezone(data.location.tz_id);
          setFormattedDate(
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(data.location.localtime))
          );
          if (temp_unit === "°F") {
            setFormattedTemp(Math.round(data.current.temp_f));
          }
          if (temp_unit === "°C") {
            setFormattedTemp(Math.round(data.current.temp_c));
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setIsLoading(false);
        }
      };
      fetchWeatherData();
    }
  }, [city]);
  // Function to update the local time every 2 seconds, update everytime there is a new city changed that has a different timezone==================================>
  useEffect(() => {
    if (timezone) {
      const interval = setInterval(() => {
        const now = new Date();
        let formattedTime = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
          hourCycle: "h12",
        }).format(now);

        // Remove leading zero from hour
        formattedTime = formattedTime.replace(/^0(\d)/, "$1");

        setLocalTime(formattedTime);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [timezone]);
  // FUNCTION TO RETURN ALL THE JSX NEEDED FOR THE MAIN DASHBOARD=====================================>
  return (
    <section className="main-dashboard">
      {weatherData.current && <Background weatherData={weatherData} />}
      <div className="main-header">
        <Search onCityChange={setCity} />
        <h2>{city}</h2>
      </div>
      <div className="main-body">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          weatherData.current && (
            <div>
              <div className="current-weather-container">
                <p className="current-time">
                  {weatherData.location && weatherData.location.localtime
                    ? localtime
                    : "N/A"}
                </p>
                <p className="current-date">
                  {weatherData.location && weatherData.location.localtime
                    ? formattedDate
                    : "N/A"}
                </p>
                <TempButtons
                  setTempUnit={setTempUnit}
                  weatherData={weatherData}
                  setFormattedTemp={setFormattedTemp}
                />
                <p className="current-temperature">
                  {weatherData.current && weatherData.current.temp_f
                    ? `${formattedTemp}${temp_unit}`
                    : "N/A"}
                </p>
              </div>
              <div className="current-weather-container">
                <p className="current-weather">
                  {weatherData.current && weatherData.current.condition ? (
                    <>
                      <img
                        src={`https:${weatherData.current.condition.icon}`}
                        alt="Weather Icon"
                        className='current-weather-icon'
                      />
                      {weatherData.current.condition.text}
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="current-humidity">
                  Humidity:{" "}
                  {weatherData.current && weatherData.current.humidity
                    ? `${weatherData.current.humidity}%`
                    : "N/A"}
                </p>
                <p className="current-wind">
                  Wind:{" "}
                  {weatherData.current && weatherData.current.wind_mph
                    ? `${weatherData.current.wind_mph} mph`
                    : "N/A"}
                  {weatherData.current && weatherData.current.wind_dir
                    ? ` (${weatherData.current.wind_dir})`
                    : ""}
                </p>
                <p className="current-uv">
                  UV Index:{" "}
                  {weatherData.current && weatherData.current.uv
                    ? weatherData.current.uv
                    : "N/A"}
                </p>
              </div>
            </div>
          )
        )}
        <Future24Hours temp_unit={temp_unit} city={city} />
        <FutureForecast temp_unit={temp_unit} city={city} />
      </div>
    </section>
  );
}

export default MainDashboard;
