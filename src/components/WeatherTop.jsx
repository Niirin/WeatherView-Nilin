import React from 'react'; 
import moment from 'moment';
const Weather = ({ weatherIcons, weatherData}) => {

    const day = moment().format('dddd');
    const date = moment().format('ll');
    const temperature = Math.floor(weatherData.main.temp);
    const description = (weatherData.weather[0].description)
    const city = weatherData.name + ', ' + weatherData.sys.country;
    const main = (weatherData.weather[0].main).toLowerCase();

    return (<div className="top-container">
                <div className="icons-main">
                <i className={` wi ${weatherIcons[main]} big-N`} alt="sunny overcast" />
                </div>
                <div className="current-weather">
                    <h2>Today: {day} {date} </h2>
                    <h1>
                        <img className="map-icon" src="/map-pin.svg" alt="current location" />
                        {city}
                    </h1>
                    <h1 className="temperature">
                        {temperature}&deg;
                    </h1>
                    <h1 className="description">{description}</h1>
                </div>
            </div>      
    );
}
export default Weather;