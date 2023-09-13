import React from 'react';

const WeatherForecast = ({ weatherIcons, weatherData }) => {

  const weatherDescriptions = {
    "day2": weatherData.list[8].weather[0].description,
    "day3": weatherData.list[16].weather[0].description,
    "day4": weatherData.list[32].weather[0].description,
    "day5": weatherData.list[40].weather[0].description
  }
    return(<div>
    <div className="forecast-days">Next 4 Days</div>
    <div className="day-forecast-cont">
      <div className="day-forecast-1">
        <h2> Wednesday</h2>
        <i className="wi wi-day-sunny-overcast mini-N" />
      </div>
      <div className="day-forecast-2">
        <h2>25&deg;
          Overcast
        </h2>
      </div>
      </div>
    </div>)
};

export default WeatherForecast; 

