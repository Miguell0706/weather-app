import React, { useState } from "react";
const UVdashboard = ({ weatherData }) => {

  const toggleUVWarning = () => {
    if (document.querySelector(".uv-alert-text").style.display === "none") {
      document.querySelector(".uv-alert-text").style.display = "block";
    } else {
      document.querySelector(".uv-alert-text").style.display = "none";
    }
  };

  return (
    <div className="uv-container">
      <p className="current-uv">
        UV Index:{" "}
        {weatherData.current && weatherData.current.uv
          ? weatherData.current.uv
          : "N/A"}
        {weatherData.current && weatherData.current.uv >= 7 && (
          <span className="uv-alert" onClick={toggleUVWarning}>
            {" "}
            &#9888;
          </span>
        )}
      </p>
      <p className="uv-alert-text">
        Warning: High UV Index! Take precautions to protect your skin.
      </p>
    </div>
  );
};

export default UVdashboard