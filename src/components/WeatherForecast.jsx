import React from 'react';

const WeatherForecast = ({ weatherIcons, forecastData }) => {

  const getDay = (timestamp) => {
    const localTimeOffset = new Date().getTimezoneOffset();
    timestamp = (timestamp*1000)- (localTimeOffset * 60);
    const date = new Date(timestamp);
    const opt = {weekday: 'long'};
    const day = new Intl.DateTimeFormat('en-US', opt).format(date);
    return day;
  }
  const day2 = {
    "description" : forecastData.list[8].weather[0].main,
    "dayofWeek" : getDay(forecastData.list[8].dt),
    "temp" : Math.floor(forecastData.list[8].main.temp)
  }
  const day3 = {
    "description" : forecastData.list[16].weather[0].main,
    "dayofWeek" : getDay(forecastData.list[16].dt),
    "temp" : Math.floor(forecastData.list[16].main.temp)
  }
  const day4 = {
    "description" : forecastData.list[24].weather[0].main,
    "dayofWeek" : getDay(forecastData.list[24].dt),
    "temp" : Math.floor(forecastData.list[24].main.temp)
  }
  const day5 = {
    "description" : forecastData.list[32].weather[0].main,
    "dayofWeek" : getDay(forecastData.list[32].dt),
    "temp" : Math.floor(forecastData.list[32].main.temp)
  }

    return(<div>
    <div className="forecast-days">Next 4 Days</div>
    <div className="day-forecast-cont">
      <div className="day-forecast-1">
        <h2 className="forecast-temp">{day2["dayofWeek"]}</h2>
        <i className={`wi forecast-day ${weatherIcons[day2["description"].toLowerCase()]} mini-N`} />
      </div>
      <div className="day-forecast-2">
        <h2 className="forecast-temp">{day2["temp"]}&deg;</h2>
        <h2 className="forecast-day">{day2["description"]}</h2>
      </div>
    </div>
    <div className="day-forecast-cont">
      <div className="day-forecast-1">
        <h2 className="forecast-temp">{day3["dayofWeek"]}</h2>
        <i className={`wi forecast-day ${weatherIcons[day3["description"].toLowerCase()]} mini-N`} />
      </div>
      <div className="day-forecast-2">
        <h2 className="forecast-temp">{day3["temp"]}&deg;</h2>
        <h2 className="forecast-day">{day3["description"]}</h2>
      </div>
    </div>
    <div className="day-forecast-cont">
      <div className="day-forecast-1">
        <h2 className="forecast-temp">{day4["dayofWeek"]}</h2>
        <i className={`wi forecast-day  ${weatherIcons[day4["description"].toLowerCase()]} mini-N`} />
      </div>
      <div className="day-forecast-2">
        <h2 className="forecast-temp">{day4["temp"]}&deg;</h2>
        <h2 className="forecast-day">{day4["description"]}</h2>
      </div>
    </div>
    <div className="day-forecast-cont">
      <div className="day-forecast-1">
        <h2 className="forecast-temp">{day5["dayofWeek"]}</h2>
        <i className={`wi forecast-day ${weatherIcons[day5["description"].toLowerCase()]} mini-N`} />
      </div>
      <div className="day-forecast-2">
        <h2 className="forecast-temp">{day5["temp"]}&deg;</h2>
        <h2 className="forecast-day">{day5["description"]}</h2>
      </div>
    </div>

    </div>)
};

export default WeatherForecast; 

