import { useEffect, useRef, useState } from "react";
const clear = "/Backgrounds/Clear.mp4";
const clearNight = "/Backgrounds/ClearNight.mp4";
const partlyCloudy = "/Backgrounds/PartlyCloudy.mp4";
const cloudy = "/Backgrounds/Cloudy.mp4";
const cloudyNight = "/Backgrounds/CloudyNight.mp4";
const overcast = "/Backgrounds/Overcast.mp4";
const rainWindow = "/Backgrounds/RainWindow.mp4";
const blowingSnow = "/Backgrounds/BlowingSnow.mp4";
const heavyRain = "/BackgrStorm.mp4";
const thunderStorm2 = "/Backgrounds/ThunderStorm2.mp4";
const blizzard = "/Backgrounds/Blizzard.mp4";
const fog = "/Backgrounds/Fog.mp4";

const Background = ({ weatherData }) => {
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(clearNight);

  useEffect(() => {
    if (weatherData && weatherData.current) {
      const isDay = weatherData.current.is_day === 1;
      const weatherCondition = weatherData.current.condition.text.toLowerCase();

      let newVideoSource = clearNight; // Default to clearNight

      if (["clear", "sunny"].includes(weatherCondition)) {
        newVideoSource = isDay ? clear : clearNight;
      } else if (["partly cloudy"].includes(weatherCondition)) {
        newVideoSource = isDay ? partlyCloudy : cloudyNight;
      } else if (
        [
          "cloudy",
          "patchy rain nearby",
          "thundery outbreaks possible",
        ].includes(weatherCondition)
      ) {
        newVideoSource = isDay ? cloudy : cloudyNight;
      } else if (["overcast"].includes(weatherCondition)) {
        newVideoSource = overcast;
      } else if (
        [
          "mist",
          "patchy rain possible",
          "patchy snow possible",
          "patchy sleet possible",
          "patchy freezing drizzle possible",
          "fog",
          "freezing fog",
        ].includes(weatherCondition)
      ) {
        newVideoSource = fog;
      } else if (
        [
          "blowing snow",
          "light snow showers",
          "patchy light snow",
          "light snow",
          "patchy moderate snow",
          "moderate snow",
          "patchy heavy snow",
          "heavy snow",
        ].includes(weatherCondition)
      ) {
        newVideoSource = blowingSnow;
      } else if (
        [
          "blizzard",
          "moderate or heavy snow showers",
          "moderate or heavy snow with thunder",
        ].includes(weatherCondition)
      ) {
        newVideoSource = blizzard;
      } else if (
        [
          "patchy light drizzle",
          "light rain shower",
          "light freezing rain",
          "light sleet",
          "light drizzle",
          "freezing drizzle",
          "patchy light rain",
          "light rain",
          "moderate rain at times",
          "moderate rain",
        ].includes(weatherCondition)
      ) {
        newVideoSource = rainWindow;
      } else if (
        [
          "heavy freezing drizzle",
          "light showers of ice pellets",
          "moderate or heavy showers of ice pellets",
          "light sleet showers",
          "moderate or heavy sleet showers",
          "moderate or heavy rain shower",
          "torrential rain shower",
          "ice pellets",
          "moderate or heavy sleet",
          "heavy rain at times",
          "heavy rain",
          "moderate or heavy freezing rain",
        ].includes(weatherCondition)
      ) {
        newVideoSource = heavyRain;
      } else if (
        [
          "patchy light rain with thunder",
          "moderate or heavy rain with thunder",
          "patchy light snow with thunder",
        ].includes(weatherCondition)
      ) {
        newVideoSource = thunderStorm2;
      }
      if (videoRef.current) {
        videoRef.current.src = newVideoSource;
        videoRef.current.load();
        videoRef.current.playbackRate = 0.4;
      }

      setVideoSource(newVideoSource);
    }
  }, [weatherData]);

  return (
    <div className="weather-background">
      <video ref={videoRef} autoPlay loop muted className="background-video">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;
