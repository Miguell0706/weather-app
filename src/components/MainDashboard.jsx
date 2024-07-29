import "../styles/MainDashboard.css";
import "../styles/BottomDashboard.css";
import Future24Hours from "./Future24Hours.jsx";
import FutureForecast from "./FutureForecast.jsx";
import Search from "./search.jsx";
import Background from "./Background.jsx";
import React, { useState, useEffect } from "react";
import TempButtons from "./TempButtons.jsx";
import UVdashboard from "./UVdashboard.jsx";
import BottomDashboard from "./BottomDashboard.jsx";
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
  const [moonPhase, setMoonPhase] = useState(null);
  const [moonIcon, setMoonIcon] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
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
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_GEO_API_KEY}`;
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
              `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=yes`
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
            setFormattedTemp(Math.round(temp_unit === "°F" ? data.current.temp_f : data.current.temp_c));
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        };
  
        const fetchAstronomy = async () => {
          try {
            const response = await fetch(
              `https://api.weatherapi.com/v1/astronomy.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`
            );
            const data = await response.json();
            setMoonPhase(data.astronomy.astro.moon_phase);
            setSunsetTime(data.astronomy.astro.sunset);
            switch (data.astronomy.astro.moon_phase) {
              case "New Moon":
                setMoonIcon("wi-moon-new");
                break;
              case "Waxing Crescent":
                setMoonIcon("wi-moon-waxing-crescent-1");
                break;
              case "First Quarter":
                setMoonIcon("wi-moon-first-quarter");
                break;
              case "Waxing Gibbous":
                setMoonIcon("wi-moon-waxing-gibbous-1");
                break;
              case "Full Moon":
                setMoonIcon("wi-moon-full");
                break;
              case "Waning Gibbous":
                setMoonIcon("wi-moon-waning-gibbous-1");
                break;
              case "Last Quarter":
                setMoonIcon("wi-moon-last-quarter");
                break;
              case "Waning Crescent":
                setMoonIcon("wi-moon-waning-crescent-1");
                break;
              default:
                setMoonIcon(null);
                break;
            }
          } catch (error) {
            console.error("Error fetching astronomy data:", error);
          }
          setIsLoading(false);
        };
  
        fetchWeatherData();
        fetchAstronomy();
      }
    }, [city]);
  // Function to update the local time every 2 seconds, up(date everytime there is a new city changed that has a different timezone==================================>
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
                <div className='moon-container'>
                  <p className='moon-phase'>
                    <i className={`wi ${moonIcon}`}></i>
                    {moonPhase}
                  </p>
                  <p className='sunset-time'>
                    <i className='wi wi-sunset'></i>{sunsetTime} (Sunset)
                  </p> 
                </div>
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
                <UVdashboard weatherData={weatherData}/>
              </div>
            </div>
          )
        )}
        <Future24Hours temp_unit={temp_unit} city={city} />
        <FutureForecast temp_unit={temp_unit} city={city} />
        <BottomDashboard weatherData={weatherData}/>
      </div>
    </section>
  );
}

export default MainDashboard;
