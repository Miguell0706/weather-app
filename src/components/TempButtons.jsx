import React, { useState, useEffect } from "react";


function TempButtons({setTempUnit, weatherData, setFormattedTemp}) {

    const changeTempUnit = (unit) => {
        if (unit === 'C') {
            setFormattedTemp(Math.round(weatherData.current.temp_c));
            setTempUnit('°C');
        } else if (unit === 'F') {
            setFormattedTemp(Math.round(weatherData.current.temp_f));
            setTempUnit('°F');
        }
    }
    return (
        <div className='temp-unit-change-container'>
            <button className="celcius-button" onClick={() => changeTempUnit('C')}>C°</button>
            <button className="fahrenheit-button" onClick={() => changeTempUnit('F')}>F°</button>
        </div>
    )
}

export default TempButtons