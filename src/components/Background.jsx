import { useEffect, useRef } from "react";
import clear from "../assets/Backgrounds/Clear.mp4";
import clearNight from "../assets/Backgrounds/ClearNight.mp4";
import partlyCloudy from "../assets/Backgrounds/PartlyCloudy.mp4";
import cloudy from "../assets/Backgrounds/Cloudy.mp4";
import cloudyNight from "../assets/Backgrounds/CloudyNight.mp4";

const Background = ({ weatherData }) => {
    const videoRef = useRef(null);
    let videoSource=clearNight;

    useEffect(() => {
        if (videoRef.current) {
            const isDay = weatherData.current.is_day === 1;
            const weatherCondition = weatherData.current.condition.text;
    
            console.log(`Weather Condition: ${weatherCondition}, isDay: ${isDay}`);
    
            if (["Clear", "Sunny"].includes(weatherCondition)) {
                videoSource = isDay ? clear : clearNight;
    
            } else if (["Partly Cloudy"].includes(weatherCondition)) {
                console.log("Partly Cloudasdsadasdasdasdy");
                videoSource = isDay ? partlyCloudy : cloudy;
            } else {
                videoSource = isDay ? cloudyNight : cloudy;
            }
            document.querySelector('source').src = videoSource;
            videoRef.current.load();
        }
    
    },[weatherData]);
    return (
        <div className="weather-background">
            <video  ref={videoRef} autoPlay loop muted className="background-video">
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Background;