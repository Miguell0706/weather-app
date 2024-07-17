import clear from "../assets/Backgrounds/Clear.mp4";
import clearNight from "../assets/Backgrounds/ClearNight.mp4";
import partlyCloudy from "../assets/Backgrounds/PartlyCloudy.mp4";
import cloudy from "../assets/Backgrounds/Cloudy.mp4";
import cloudyNight from "../assets/Backgrounds/CloudyNight.mp4";
const Background = ({ weatherData }) => {
    const weatherCondition = weatherData.current.condition.text
    let videoSource;
    const isDay = weatherData.current.is_day;

    if (["Clear", "Sunny"].includes(weatherCondition)) {
        videoSource = isDay ? clear : clearNight;
    } else if (["Partly cloudy"].includes(weatherCondition)) {
        videoSource = isDay ? partlyCloudy : cloudyNight;
    } else {
        videoSource = clear;
    }

    return (
    <div className="weather-background">
        <video autoPlay loop muted className="background-video">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
    </div>
    );
};
    

export default Background;
